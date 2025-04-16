import axios from 'axios';

const client = axios.create();
const requestOptionsProps = ['sdkMinTimeThreshold'];
async function processHttpRequest(method, url, requestOptions) {
  const minTimeThreshold = requestOptions?.sdkMinTimeThreshold ?? 0;
  const startTime = minTimeThreshold > 0 ? Date.now() : 0;
  const axiosOptions = requestOptions ? Object.keys(requestOptions).filter(prop => !requestOptionsProps.includes(prop)).reduce((memo, prop) => Object.assign({}, memo, {
    [prop]: requestOptions[prop]
  }), {}) : {};
  const config = Object.assign({}, axiosOptions ?? {}, {
    method,
    url
  });
  try {
    const response = await client(config);
    if (minTimeThreshold > 0) {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minTimeThreshold) {
        const remainingTime = minTimeThreshold - elapsedTime;
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      // the server responded with a status that fails in validateStatus
      return error.response.data;
    } else if (error.request) {
      // no response received, error.request is an instance of XMLHttpRequest
      console.error(error);
      return {
        error: {
          code: "no_response"
        }
      };
    } else {
      // request setup is incorrect
      console.error(error);
      return {
        error: {
          code: "invalid_request_setup",
          message: error.message
        }
      };
    }
  }
}

const util = {
  formDataToJson
};
function formDataToJson(formData) {
  const json = {};
  for (const pair of formData.entries()) {
    const k = pair[0];
    if (k in json) {
      if (!Array.isArray(json[k])) {
        json[k] = [json[k]];
      }
      json[k].push(pair[1]);
    } else {
      json[k] = pair[1];
    }
  }
  return json;
}

client.defaults.withCredentials = true;
client.defaults.responseType = 'json';
client.defaults.validateStatus = function () {
  return true;
};
client.defaults.baseURL = '';
const sdk = {
  util,
  client,
  get: async opts => {
    return await processHttpRequest('get', '/', opts);
  },
  otp: {
    post: async (json, opts) => {
      return await processHttpRequest('post', '/otp', Object.assign({}, opts ?? {}, {
        data: json
      }));
    },
    put: async (json, opts) => {
      return await processHttpRequest('put', '/otp', Object.assign({}, opts ?? {}, {
        data: json
      }));
    }
  }
};

export { sdk };
//# sourceMappingURL=index.js.map
