function of(promise) {
  const errorMessage = 'File reading error';

  return Promise.resolve(promise)
    .then((res) => {
      return Promise.resolve(res.json()).then((data) => {
        if (res.ok) return [null, data];
        return [{ message: errorMessage }, null];
      });
    })
    .catch(() => {
      return [{ message: errorMessage }, null];
    });
}

async function getLocalJSON(url) {
  const response = await of(fetch(url));
  return response;
}

export {
  getLocalJSON,
};
