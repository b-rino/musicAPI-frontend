import { StrictMode } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./pages/Layout/App.jsx";
import { ThemeProvider } from "../ThemeContext.jsx";
import "../global.css";
import Home from "./pages/Home/Home.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import SearchSong from "./pages/SearchSong/SearchSong.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import Register from "./pages/Register/Register.jsx";
import Playlists from "./pages/Playlists/Playlists.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import UserDetail from "./pages/UserDetail/UserDetail.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="search" element={<SearchSong />} />
            <Route path="login" element={<LogIn />} />
            <Route path="register" element={<Register />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="admin" element={<Admin />} />
            <Route path="admin/users/:username" element={<UserDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
