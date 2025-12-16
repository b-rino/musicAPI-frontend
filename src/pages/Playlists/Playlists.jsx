import styles from "./Playlists.module.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import facade from "../../../utils/apiFacade";

export default function Playlists() {
  const { username, loggedIn } = useOutletContext();
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loggedIn) return;
    facade
      .getPlaylists()
      .then((res) => setPlaylists(res.body))
      .catch((err) =>
        setError(err?.body?.message || err?.message || "Unexpected error")
      );
  }, []);

  return (
    <div className={styles.container}>
      {" "}
      <h1 className={styles.pageTitle}>Playlists</h1>
      <h2 className={styles.username}>{username}'s Playlists</h2>
      {error && <p className={styles.error}>{error}</p>}{" "}
      {loggedIn ? (
        playlists.map((playlist) => (
          <div key={playlist.id} className={styles.playlistBlock}>
            {" "}
            <h2>
              {playlist.name} ({playlist.songs.length} songs)
            </h2>{" "}
            <table className={styles.playlistTable}>
              {" "}
              <thead>
                {" "}
                <tr>
                  {" "}
                  <th>Title</th> <th>Artist</th> <th>Album</th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {playlist.songs.map((song) => (
                  <tr key={song.id}>
                    {" "}
                    <td>{song.title}</td> <td>{song.artist}</td>{" "}
                    <td>{song.album}</td>{" "}
                  </tr>
                ))}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>
        ))
      ) : (
        <p>Please log in to view your playlists.</p>
      )}
    </div>
  );
}
