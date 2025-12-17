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
    setUserRole("");
    setUsername("");
  };

  const doLogin = async (user, pass) => {
    const res = await facade.login(user, pass);
    if (res.status === 200) {
      setLoggedIn(true);
      const [username, roles] = facade.getUsernameAndRoles();
      setUserRole(roles[0]);
      setUsername(username);
    }
    return res;
  };

  const baseHeaders = [
    { title: "Home", url: "/" },
    { title: "Search Songs", url: "/search" },
  ];

  const headers = loggedIn
    ? [
        ...baseHeaders,
        { title: "Playlists", url: "/playlists" },
        ...(userRole === "Admin" ? [{ title: "Admin", url: "/admin" }] : []),
      ]
    : [...baseHeaders, { title: "Log in", url: "/login" }];

  return (
    <>
      <Header headers={headers} loggedIn={loggedIn} logout={logout} />
      <Outlet context={{ doLogin, logout, userRole, username, loggedIn }} />
      <Footer />
    </>
  );
}

export default App;
