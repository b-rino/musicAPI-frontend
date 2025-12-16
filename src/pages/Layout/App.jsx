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

  const login = (user, pass) => {
    facade.login(user, pass).then(() => {
      setLoggedIn(true);
      const [username, roles] = facade.getUsernameAndRoles();
      setUserRole(roles);
      setUsername(username);
    });
  };

  return (
    <>
      <Header
        headers={[
          { title: "Home", url: "/" },
          { title: "Log in", url: "/login" },
          { title: "Search Songs", url: "/search" },
        ]}
      />
      <Outlet context={{ login, logout, userRole, username, loggedIn }} />
      <Footer />
    </>
  );
}

export default App;
