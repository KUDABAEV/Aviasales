const DEFAULT_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function client({ endPoint, customOptions = {}, callback }) {
  const { method = DEFAULT_OPTIONS.method, body } = customOptions;

  const answer = {
    data: null,
    err: null,
    response: null,
  };

  const options = {
    method,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...customOptions.headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    // await wait();
    // await getErrorPromise(50);

    const response = await fetch(endPoint, options);

    if (!response.ok) {
      throw new Error(`
        Блядь. 
        Response not ok. 
        Endpoint: ${response.url}.
        Code: ${response.status}.
        Message ${response.statusText}.
        `);
    }

    answer.response = response;

    const data = await response.json();
    answer.data = data;
  } catch (err) {
    answer.err = err;
  } finally {
    if (callback) {
      callback(answer);
    }
  }

  return answer;
}

client.get = (endPoint, customOptions) => {
  const modOptions = {
    ...customOptions,
    method: 'GET',
  };
  return client({ endPoint, customOptions: modOptions });
};

client.delete = (endPoint, customOptions) => {
  const modOptions = {
    ...customOptions,
    method: 'DELETE',
  };

  return client({ endPoint, customOptions: modOptions });
};

client.post = (endPoint, body, customOptions) => {
  const modOptions = {
    ...customOptions,
    method: 'POST',
    body,
  };

  return client({ endPoint, customOptions: modOptions });
};

client.patch = (endPoint, body, customOptions) => {
  const modOptions = {
    ...customOptions,
    method: 'PATCH',
    body,
  };

  return client({ endPoint, customOptions: modOptions });
};

client.put = (endPoint, body, customOptions) => {
  const modOptions = {
    ...customOptions,
    method: 'PUT',
    body,
  };

  return client({ endPoint, customOptions: modOptions });
};
