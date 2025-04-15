import path from "node:path";
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'
import { dts } from 'rollup-plugin-dts'

export default [
    {
        external: ['axios'],
        input: path.resolve(import.meta.dirname, 'src/index.ts'),
        output: [
            {
                format: 'es',
                file: 'dist/index.js',
                sourcemap: true
            },
            {
                format: 'cjs',
                file: 'dist/index.cjs',
                sourcemap: true
            }
        ],
        plugins: [
            alias({
                entries: [
                    {
                        find: '@src',
                        replacement: path.resolve(import.meta.dirname, 'src')
                    }
                ]
            }),
            typescript(),
            commonjs({ sourceMap: true, extensions: ['.js', '.ts'] }),
            babel({
                extensions: ['.ts'],
                include: ['src/**/*.ts'],
                babelHelpers: 'bundled',
                babelrc: false,
                presets: ['@babel/preset-typescript'],
                plugins: []
            })
        ]
    },
    {
        input: "./src/index.generated.d.ts",
        output: [
            { file: "dist/index.d.cts", format: "cjs" },
            { file: "dist/index.d.ts", format: "es" }
        ],
        plugins: [

            dts()
        ],
    }
]