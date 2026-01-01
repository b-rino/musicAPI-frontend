import styles from "./Playlists.module.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import facade from "../../utils/apiFacade";
import PlaylistOptions from "../../components/PlaylistDropDown/PlaylistOptions";

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

  const renamePlaylist = (playlist, newName) => {
    facade
      .renamePlaylist(playlist.id, newName)
      .then(() => {
        setPlaylists((prev) =>
          prev.map((p) => (p.id === playlist.id ? { ...p, name: newName } : p))
        );
      })
      .catch((err) => setError(facade.extractErrorMessage(err)));
  };

  const deletePlaylist = (id) => {
    facade
      .deletePlaylist(id)
      .then(() => {
        setPlaylists((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => setError(facade.extractErrorMessage(err)));
  };

  const removeSong = (playlistId, songId) => {
    if (!window.confirm("Remove this song from the playlist?")) return;

    facade
      .deleteSongFromPlaylist(playlistId, songId)
      .then(() => {
        setPlaylists((prev) =>
          prev.map((p) =>
            p.id === playlistId
              ? { ...p, songs: p.songs.filter((s) => s.id !== songId) }
              : p
          )
        );
      })
      .catch((err) => setError(facade.extractErrorMessage(err)));
  };

  return (
    <div className={styles.container}>
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
      {error && <p className={styles.error}>{error}</p>}
      {loggedIn ? (
        playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div key={playlist.id} className={styles.playlistBlock}>
              <div className={styles.playlistHeader}>
                <h2>{playlist.name}</h2>
                <PlaylistOptions
                  playlist={playlist}
                  onRename={(p) => {
                    const newName = prompt("Enter new name:", p.name);
                    if (newName) renamePlaylist(p, newName);
                  }}
                  onDelete={(id) => {
                    if (window.confirm(`Delete playlist "${playlist.name}"?`)) {
                      deletePlaylist(id);
                    }
                  }}
                />
              </div>
              <table className={styles.playlistTable}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {playlist.songs.map((song) => (
                    <tr key={song.id}>
                      <td>{song.title}</td>
                      <td>{song.artist}</td>
                      <td>{song.album}</td>
                      <td>
                        <button
                          onClick={() => removeSong(playlist.id, song.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
