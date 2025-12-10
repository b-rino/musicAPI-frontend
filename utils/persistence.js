export function fetchData(url, callback, method, body) {
  const headers = {
    Accept: "application/json",
  };

  if (method === "POST" || method === "PUT" || method === "PATCH") {
    headers["Content-Type"] = "application/json";
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          statusText: res.statusText,
        });
      }
      return res.json();
    })
    .then((data) => callback(data))
    .catch((err) => {
      if (err.status) {
        console.error(`HTTP error ${err.status}: ${err.statusText}`);
        callback({ error: true, status: err.status });
      } else {
        console.error("Network error", err);
        callback({ error: true });
      }
    });
}
