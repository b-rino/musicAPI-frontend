import "./App.css";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import facade from "../../../utils/apiFacade";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const doLogin = async (user, pass) => {
    const res = await facade.login(user, pass); // smider ved 403
    if (res.status === 200) {
      setLoggedIn(true);
      const [username, roles] = facade.getUsernameAndRoles();
      setUserRole(roles);
      setUsername(username);
    }
    return res;
  };

  const baseHeaders = [
    { title: "Home", url: "/" },
    { title: "Search Songs", url: "/search" },
  ];

  const headers = loggedIn
    ? [...baseHeaders, { title: "Playlists", url: "/playlists" }]
    : [...baseHeaders, { title: "Log in", url: "/login" }];

  <Header headers={headers} />;

  return (
    <>
      <Header headers={headers} loggedIn={loggedIn} logout={logout} />
      <Outlet context={{ doLogin, logout, userRole, username, loggedIn }} />
      <Footer />
    </>
  );
}

export default App;
