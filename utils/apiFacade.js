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

function extractErrorMessage(err, fallback = "Could not connect to server. Please try again later.") {
  if (err?.body?.message) {
    return err.body.message;
  } //undefined er falsy! 
  if (err?.message) {
    return err.message;
  }
  return fallback;
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


//Fejlhåndtering i login og register sker i safeFetch og jeg ikke tilføjer ekstra logging (da jeg ikke har adgang til stacktrace anyways)! 
const login = async (user, password) => {
  const res = await safeFetch("/login", "POST", false, { username: user, password });
  setToken(res.body.token);
  return res;
};

const register = async (user) => {
  return await safeFetch("/register", "POST", false, user);
};


       

const getPlaylists = () => {
   return safeFetch("/playlists", "GET", true); };

const searchSongs = (query) => { 
  return safeFetch(`/songs/search?query=${query}`, "GET", false); };

const fetchData = (endpoint, method = "GET", addToken = false, body = null) => {
  const options = makeOptions(method, addToken, body);

  return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
};

const makeOptions = (method, addToken, body) => {
  const opts = {
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



  async function safeFetch(endpoint, method = "GET", addToken = false, body = null) {
     try {
       return await fetchData(endpoint, method, addToken, body);
       } catch (err) {
         console.error("API error:", err.status, err.body);
          throw err; //Konventionen er normalt at smide et Error-objekt (for at få adgang til .stack og .message osv), men jeg har sikret i min backend at sende fyldstgørende fejlmeddelelser og derfor sender jeg bare det videre!
        }
    }


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
  getPlaylists,
  searchSongs,
  extractErrorMessage,
};

export default facade;
