'use strict';

var axios = require('axios');

const client = axios.create();
async function processHttpRequest(method, url, endpointConfig) {
  const config = Object.assign({}, endpointConfig ?? {}, {
    method,
    url
  });
  try {
    const response = await client(config);
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

client.defaults.withCredentials = true;
client.defaults.responseType = 'json';
client.defaults.validateStatus = function () {
  return true;
};
client.defaults.baseURL = '';
const sdk = {
  get: async () => {
    return await processHttpRequest('get', '/');
  },
  otp: {
    post: async json => {
      return await processHttpRequest('post', '/otp', {
        data: json
      });
    },
    put: async json => {
      return await processHttpRequest('put', '/otp', {
        data: json
      });
    }
  }
};

exports.client = client;
exports.sdk = sdk;
//# sourceMappingURL=index.cjs.map
