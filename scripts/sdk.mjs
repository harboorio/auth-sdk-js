import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import * as os from "node:os";
import { TYPES_PREFIX } from '@harboorio/auth-backend/schema'

const indent = '    '
const lnbr = os.EOL
const openapi = JSON.parse(await readFile(path.resolve(process.cwd(), 'src/schema', 'openapi.json'), 'utf8'))
let collectedTypes = [], tmodule = ''
const schemaCode = renderSchema(openapi)
const code = `import { client, processHttpRequest } from '@src/http-client'
import { util } from '@src/util'
import type { ${collectedTypes.join(', ')} } from './schema/index'

client.defaults.withCredentials = true
client.defaults.responseType = 'json'
client.defaults.validateStatus = function () {
    return true;
}
client.defaults.baseURL = ${(openapi.servers ?? []).find(({ description }) => /(production)/i.test(description))?.url ?? `''`}

${schemaCode}
export { sdk }
`
const types = `import { type AxiosInstance } from 'axios'
import { type Util } from './util'
import type { ${collectedTypes.join(', ')} } from './schema/index'

export const client: AxiosInstance
export const sdk: ${TYPES_PREFIX}Sdk

${tmodule}
export type { ${collectedTypes.join(', ')} }`

await writeFile(path.resolve(import.meta.dirname, '..', 'src', 'index.generated.ts'), code)
await writeFile(path.resolve(import.meta.dirname, '..', 'src', 'index.generated.d.ts'), types)

export function renderSchema(openapi) {
    // sort paths by depth
    const endpoints = Object.keys(openapi.paths).sort((a, b) => {
        const asegments = a.split('/').length
        const bsegments = b.split('/').length
        return asegments < bsegments ? 1 : asegments === bsegments ? 0 : -1
    })
    let processedPaths = [], isInitialSegment = true, blocks = 'const sdk = {' + lnbr + indent + 'util,' + lnbr + indent + 'client,' + lnbr
    tmodule += 'export interface ' + TYPES_PREFIX + 'Sdk {' + lnbr + indent + 'util: Util' + lnbr + indent + 'client: AxiosInstance' + lnbr
    for (const url of endpoints) {
        const segments = url.split('/')
        blocks += renderSegmentRecursive(segments, { level: isInitialSegment ? 0 : 1, schema: openapi, path: '/', processedPaths, collectedTypes })
        isInitialSegment = false
    }
    blocks += '}' + lnbr
    tmodule += '}' + lnbr
    return blocks
}

export function renderSegmentRecursive(segments, opts = { level: 0, schema: { paths: {} }, path: '/', processedPaths: [], collectedTypes: [] }) {
    const segment = segments.shift()
    opts.path = opts.path + (opts.path.endsWith('/') ? '' : '/') + segment
    if (opts.processedPaths.includes(opts.path)) {
        return segments.length > 0 ? renderSegmentRecursive(segments, opts) : ''
    }
    opts.processedPaths.push(opts.path)
    const name = opts.path === '/' ? 'Home' : opts.path.split('/').filter(Boolean)
        .map((segment) => titleCase(segment.startsWith(':') ? segment.slice(1) : segment))
        .join('')
    let block = opts.path === '/' ? '' : indent.repeat(opts.level) + segment + ': {' + lnbr
    tmodule += opts.path === '/' ? '' : indent.repeat(opts.level) + segment + ': {' + lnbr

    if (opts.schema.paths && opts.path in opts.schema.paths) {
        for (const method of Object.keys(opts.schema.paths[opts.path])) {
            const typeName = TYPES_PREFIX + name + titleCase(method)
            const op = opts.schema.paths[opts.path][method]
            const hasBody = 'requestBody' in op
            block += indent.repeat(opts.level + 1) + method + `: async (${hasBody ? `json: ${typeName}Body` : ''}): Promise<${typeName}Response> => {` + lnbr
            block += indent.repeat(opts.level + 2) + `return (await processHttpRequest('${method}', '${opts.path}'${hasBody ? ', { data: json }' : ''})) as ${typeName}Response` + lnbr
            block += indent.repeat(opts.level + 1) + '},' + lnbr
            tmodule += indent.repeat(opts.level + 1) + method + `: (${hasBody ? `json: ${typeName}Body` : ''}) => Promise<${typeName}Response>` + lnbr

            opts.collectedTypes.push(`${typeName}Response`)
            if (hasBody) opts.collectedTypes.push(`${typeName}Body`)
        }
    }

    if (segments.length > 0) {
        block += renderSegmentRecursive(
            segments,
            Object.assign({}, opts, { level: opts.level + 1 })
        )
    }

    block += opts.path === '/' ? '' : indent.repeat(opts.level) + '},' + lnbr
    tmodule += opts.path === '/' ? '' : indent.repeat(opts.level) + '},' + lnbr

    return block
}

function titleCase(text) {
    return text.slice(0, 1).toUpperCase() + text.slice(1)
}
