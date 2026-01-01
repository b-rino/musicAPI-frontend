import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Header({ headers, loggedIn, logout }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        {headers.map((header, index) => (
          <NavLink
            key={index}
            to={header.url}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            {header.title}
          </NavLink>
        ))}
      </nav>
      <div className={styles.actions}>
        {loggedIn && (
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        )}
        <button onClick={toggleTheme} className={styles.themeButton}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
}
