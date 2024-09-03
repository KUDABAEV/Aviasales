export async function client(url, customOptions = {}) {
  const { body, method = 'GET' } = customOptions;

  const headersDefault = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  const options = {
    method,
    body: JSON.stringify(body),
    headers: {
      ...headersDefault,
      ...customOptions.headersDefault,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

client.get = function clientGet(url, customOptions) {
  return client(url, { ...customOptions, method: 'GET' });
};

client.post = function clientPost(url, customOptions) {
  return client(url, { ...customOptions, method: 'POST' });
};

client.post = function clientDelete(url, customOptions) {
  return client(url, { ...customOptions, method: 'DELETE' });
};
