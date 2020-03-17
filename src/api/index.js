/**
 * resolve received data
 *
 * @param {Promise} promise
 * @return Promise
 */
function of(promise) {
  const errorMessage = 'File reading error';

  return Promise.resolve(promise)
    .then((res) => (
      Promise.resolve(res.json()).then((data) => {
        if (res.ok) return [null, data];
        return [{ message: errorMessage }, null];
      })
    ))
    .catch(() => [{ message: errorMessage }, null]);
}

/**
 * fetch JSON data
 *
 * @param {String} url
 * @return Array [error, json]
 */
async function getLocalJSON(url) {
  const response = await of(fetch(url));
  return response;
}

export {
  getLocalJSON,
};
