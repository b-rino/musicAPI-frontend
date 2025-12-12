import { StrictMode } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./pages/Layout/App.jsx";
import { ThemeProvider } from "../ThemeContext.jsx";
import "../global.css";
import Home from "./pages/Home/Home.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import SearchSong from "./pages/SearchSong/SearchSong.jsx";

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
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
