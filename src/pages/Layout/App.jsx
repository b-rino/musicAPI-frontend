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
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await facade.login(user, pass); // smider ved 403
      if (res.status === 200) {
        setLoggedIn(true);
        const [username, roles] = facade.getUsernameAndRoles();
        setUserRole(roles);
        setUsername(username);
      }
      return res;
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Header
        headers={[
          { title: "Home", url: "/" },
          { title: "Log in", url: "/login" },
          { title: "Search Songs", url: "/search" },
          { title: "Playlists", url: "/playlists" },
        ]}
      />
      <Outlet context={{ doLogin, logout, userRole, username, loggedIn }} />
      <Footer />
    </>
  );
}

export default App;
