const BASE_URL = "https://music.brino.dk/api/v1";

function handleHttpErrors(res) {
  if (!res.ok) {
    return res.json().then((body) => {
      throw {
        status: res.status,
        body,
      };
    });
  }
  return res.json().then((body) => ({
    status: res.status,
    body,
  }));
}

const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};
const getToken = () => {
  return localStorage.getItem("jwtToken");
};
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
};
const logout = () => {
  localStorage.removeItem("jwtToken");
};

const login = (user, password) => {
  const options = makeOptions("POST", false, {
    username: user,
    password: password,
  });
  return fetch(BASE_URL + "/login", options)
    .then(handleHttpErrors)
    .then((res) => {
      setToken(res.token);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

const register = (user) => {
  const options = makeOptions("POST", false, user);
  return fetch(BASE_URL + "/register", options).then(handleHttpErrors);
};

const fetchData = (endpoint, method = "GET", addToken = false, body = null) => {
  const options = makeOptions(method, addToken, body);

  return fetch(BASE_URL + endpoint, options).then(async (res) => {
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      throw { status: res.status, body: data };
    }
    return { status: res.status, body: data };
  });
};

const makeOptions = (method, addToken, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (addToken && loggedIn()) {
    opts.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};

const getUsernameAndRoles = () => {
  const token = getToken();
  if (token != null) {
    const payloadBase64 = getToken().split(".")[1];
    const decodedClaims = JSON.parse(window.atob(payloadBase64));
    const roles = decodedClaims.roles;
    const roleArray = Array.isArray(roles) ? roles : roles.split(",");
    const username = decodedClaims.username;
    return [username, roleArray];
  } else return [];
};

const hasUserAccess = (neededRole, loggedIn) => {
  const roles = getUsernameAndRoles()[1] || [];
  return (
    loggedIn &&
    roles.map((r) => r.toLowerCase()).includes(neededRole.toLowerCase())
  );
};

const facade = {
  makeOptions,
  setToken,
  getToken,
  loggedIn,
  login,
  logout,
  fetchData,
  hasUserAccess,
  getUsernameAndRoles,
  register,
};

export default facade;
