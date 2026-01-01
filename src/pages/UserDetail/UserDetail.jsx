import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import facade from "../../utils/apiFacade";
import styles from "./UserDetail.module.css";

export default function UserDetail() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    facade
      .getUser(username)
      .then((res) => setUser(res.body))
      .catch((err) => setError(facade.extractErrorMessage(err)));
  }, [username]);

  const deleteUser = () => {
    facade
      .deleteUser(username)
      .then(() => navigate("/admin"))
      .catch((err) => setError(facade.extractErrorMessage(err)));
  };

  const makeAdmin = () => {
    facade
      .addRole(username, "Admin")
      .then(() => facade.getUser(username)) //backend leverer ikke opdateret User tilbage, men blot en success-besked - derfor må jeg hente på ny!
      .then((res) => setUser(res.body))
      .then(() => navigate("/admin"))
      .catch((err) => setError(facade.extractErrorMessage(err)));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>User Detail: {user.username}</h1>
      {error && <p className={styles.error}>{error}</p>}
      <p>
        <strong>Roles:</strong> {user.roles.join(", ")}
      </p>
      <p>
        <strong>Playlists:</strong>
      </p>
      {user.playlists.length > 0 ? (
        <ul className={styles.playlistList}>
          {user.playlists.map((p) => (
            <li key={p.id} className={styles.playlistItem}>
              <strong>{p.name}</strong> ({p.songs.length} songs)
              {p.songs.length > 0 ? (
                <table className={styles.songTable}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Artist</th>
                      <th>Album</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.songs.map((s) => (
                      <tr key={s.id}>
                        <td>{s.title}</td>
                        <td>{s.artist}</td>
                        <td>{s.album}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No songs in this playlist</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No playlists</p>
      )}

      <button onClick={deleteUser} className={styles.deleteBtn}>
        Delete User
      </button>
      <button onClick={makeAdmin} className={styles.adminBtn}>
        Make Admin
      </button>
    </div>
  );
}
