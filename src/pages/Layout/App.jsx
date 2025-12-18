import "./App.css";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import facade from "../../../utils/apiFacade";

function App() {
  //Startede med at initialiserer som "false", men det gav mismatch mellem jwt-token og loggedIn state ved hard refresh!
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn());
  const [userRoles, setUserRoles] = useState([]);
  const [username, setUsername] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setUserRoles([]);
    setUsername("");
  };

  const doLogin = async (user, pass) => {
    const res = await facade.login(user, pass);
    if (res.status === 200) {
      setLoggedIn(true);
      const [username, roles] = facade.getUsernameAndRoles();
      setUserRoles(roles);
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
        ...(userRoles.includes("Admin")
          ? [{ title: "Admin Panel", url: "/admin" }]
          : []),
      ]
    : [...baseHeaders, { title: "Log in", url: "/login" }];

  return (
    <>
      <Header headers={headers} loggedIn={loggedIn} logout={logout} />
      <Outlet context={{ doLogin, logout, userRoles, username, loggedIn }} />
      <Footer />
    </>
  );
}

export default App;
