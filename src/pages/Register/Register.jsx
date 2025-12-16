import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./Register.module.css";
import facade from "../../../utils/apiFacade";

export default function Register() {
  const { loggedIn } = useOutletContext();
  const init = { username: "", password: "" };
  const [user, setUser] = useState(init);

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
        console.log("Bruger oprettet 🎉");
      }
    } catch (err) {
      if (err.status === 409) {
        console.log("Username er allerede taget ❌");
      } else {
        console.log("Ukendt fejl", err);
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
            />
            <input
              type="password"
              id="password"
              onChange={onChange}
              placeholder="Password"
            />
          </form>
          <button type="submit">Register</button>
        </div>
      ) : (
        <div>
          <p>You are already logged in!</p>
        </div>
      )}
    </div>
  );
}
