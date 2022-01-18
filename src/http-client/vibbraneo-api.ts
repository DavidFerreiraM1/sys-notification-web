const baseUrl = 'http://api.vibbraneo.com/';

const headersDefault = {
  'Content-Type': 'application/json'
};

export const authHeader = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': 'Bearer jwt_token'
};

const get = (url: string, headers?: HeadersInit): Promise<Response> => {
  const headersObj = headers ? headers : headersDefault;
  return fetch(
    `${baseUrl}/${url}`,
    {
      method: 'get',
      headers: headersObj,
    });
};

const post = (url: string, body: any, headers?: HeadersInit) => {
  const headersObj = headers ? headers : headersDefault;
  return fetch(
    `${baseUrl}/${url}`,
    {
      method: 'post',
      headers: headersObj,
      body
    });
}

export function useVibbraneoApi() {
  return {
    get,
    post
  }
}
