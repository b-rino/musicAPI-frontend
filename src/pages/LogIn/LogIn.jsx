import styles from "./LogIn.module.css";
import { useState } from "react";
import {
  useOutletContext,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import facade from "../../utils/apiFacade";

export default function LogIn() {
  const navigate = useNavigate();
  const { doLogin, logout, loggedIn } = useOutletContext();
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [error, setError] = useState(null);

  const performLogin = async (evt) => {
    evt.preventDefault();
    setError(null);
    try {
      await doLogin(loginCredentials.username, loginCredentials.password);
      setLoginCredentials(init);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        facade.extractErrorMessage(err, "Login failed. Please try again.")
      );
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Login</h1>
      {!loggedIn ? (
        <>
          <form className={styles.inputForm} onSubmit={performLogin}>
            <input
              placeholder="Username"
              id="username"
              type="text"
              autoComplete="username"
              onChange={onChange}
              value={loginCredentials.username}
              required
            />
            <input
              placeholder="Password"
              id="password"
              type="password"
              autoComplete="current-password"
              onChange={onChange}
              value={loginCredentials.password}
              required
            />
            <button type="submit">Login</button>
          </form>
          <div className={styles.registerLink}>
            <Link to="/register">click here to sign up</Link>
          </div>
          {error && <p>{error}</p>}
        </>
      ) : (
        <div>
          <p>You are already logged in!</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
