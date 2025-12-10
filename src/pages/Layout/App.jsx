import "./App.css";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function App() {
  return (
    <>
      <Header
        headers={[
          { title: "Home", url: "/" },
          { title: "Log in", url: "/login" },
          { title: "Register", url: "/register" },
        ]}
      />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
