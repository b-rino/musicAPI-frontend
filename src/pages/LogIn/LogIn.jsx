import styles from "./LogIn.module.css";
import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

export default function LogIn() {
  const { doLogin, logout, username, loggedIn } = useOutletContext();

  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [error, setError] = useState(null);

  const performLogin = async (evt) => {
    evt.preventDefault();
    setError(null);
    try {
      await doLogin(loginCredentials.username, loginCredentials.password);
      setLoginCredentials(init);
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.body?.message || err?.message || "Unexpected error");
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
          <form onSubmit={performLogin}>
            <input
              placeholder="User Name"
              id="username"
              type="text"
              autoComplete="username"
              onChange={onChange}
              value={loginCredentials.username}
            />
            <input
              placeholder="Password"
              id="password"
              type="password"
              autoComplete="current-password"
              onChange={onChange}
              value={loginCredentials.password}
            />
            <button type="submit">Login</button>
          </form>
          <div>
            <Link to="/register">click here to sign up</Link>
          </div>
          {error && <p>{error}</p>}
        </>
      ) : (
        <div>
          <p>You are logged in as {username}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
