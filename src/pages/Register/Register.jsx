import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./Register.module.css";
import facade from "../../../utils/apiFacade";

export default function Register() {
  const { loggedIn } = useOutletContext();
  const init = { username: "", password: "" };
  const [user, setUser] = useState(init);
  const [message, setMessage] = useState(null);

  const onChange = (evt) => {
    setUser({
      ...user,
      [evt.target.id]: evt.target.value,
    });
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const result = await facade.register(user);

      if (result.status === 201) {
        setMessage("User successfully created - please log in");
      }
      setUser(init);
    } catch (err) {
      if (err.status === 409) {
        setMessage("Username already exists");
      } else {
        console.log("Unknown error!", err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Register</h1>
      {!loggedIn ? (
        <div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id="username"
              onChange={onChange}
              placeholder="Username"
              value={user.username}
            />
            <input
              type="password"
              id="password"
              onChange={onChange}
              placeholder="Password"
              value={user.password}
            />
            <button type="submit">Register</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div>
          <p>You are already logged in!</p>
        </div>
      )}
    </div>
  );
}
