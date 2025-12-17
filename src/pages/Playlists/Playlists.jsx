import styles from "./Playlists.module.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import facade from "../../../utils/apiFacade";

export default function Playlists() {
  const { loggedIn } = useOutletContext();
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState("");

  useEffect(() => {
    if (!loggedIn) {
      setPlaylists([]); //advarer om uendeligt loop, men det er ikke tilfældet her. Kan dog splittes i to useEffects for at undgå warning!
      return;
    }
    facade
      .getPlaylists()
      .then((res) => setPlaylists(res.body))
      .catch((err) => setError(facade.extractErrorMessage(err)));
  }, [loggedIn]);

  const onSubmit = (e) => {
    e.preventDefault();
    facade
      .createPlaylist(newPlaylist)
      .then((res) => {
        setPlaylists((prev) => [...prev, res.body]);
        setNewPlaylist("");
      })
      .catch((err) => setError(facade.extractErrorMessage(err)));
  };

  return (
    <div className={styles.container}>
      {" "}
      <h1 className={styles.pageTitle}>Playlists</h1>
      {loggedIn && (
        <form className={styles.playlistForm} onSubmit={onSubmit}>
          <input
            type="text"
            id="newPlaylist"
            minLength={1}
            required
            value={newPlaylist}
            onChange={(e) => setNewPlaylist(e.target.value)}
            placeholder="Playlist Name"
            className={styles.playlistInput}
          />
          <button type="submit" className={styles.playlistBtn}>
            Create Playlist
          </button>
        </form>
      )}
      {error && <p className={styles.error}>{error}</p>}{" "}
      {loggedIn ? (
        playlists.length > 0 ? (
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
          <p>Currently no playlists!</p>
        )
      ) : (
        <p>Please log in to view your playlists.</p>
      )}
    </div>
  );
}
