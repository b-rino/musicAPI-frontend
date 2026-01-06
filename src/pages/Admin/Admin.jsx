import { useEffect } from "react";
import styles from "./Admin.module.css";
import { useOutletContext, useNavigate } from "react-router-dom";
import facade from "../../utils/apiFacade";
import { useState } from "react";

export default function Admin() {
  const navigate = useNavigate();

  const { userRoles, loggedIn } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (!userRoles.includes("Admin")) return;

    facade
      .getLocalSongs()
      .then((res) => setSongs(res.body))
      .catch((err) => setError(facade.extractErrorMessage(err)));
  }, []);

  useEffect(() => {
    if (!userRoles.includes("Admin")) {
      setUsers([]);
      return;
    }

    facade
      .getUsers()
      .then((res) => setUsers(res.body))
      .catch((err) => setError(facade.extractErrorMessage(err)));
  }, [userRoles]);

  if (!loggedIn || !userRoles.includes("Admin")) {
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Access Denied</h1>

        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Admin Panel</h1>
      {error && <p className={styles.error}>{error}</p>}
      <h2>Users</h2>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Roles</th>
            <th>Playlists</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.username}
              className={styles.clickableRow}
              onClick={() => navigate(`/admin/users/${u.username}`)}
            >
              <td>{u.username}</td>
              <td>{u.roles.join(", ")}</td>
              <td>
                {u.playlists.length > 0 ? (
                  <ul>
                    {u.playlists.map((p) => (
                      <li key={p.id}>
                        {p.name} - {p.songs.length} song(s)
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No playlists"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className={styles.divider}>Local Songs</h2>
      <table className={styles.songsTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>External ID</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.externalId}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
