import styles from "./SearchSong.module.css";
import { useEffect, useState } from "react";
import facade from "../../../utils/apiFacade";

export default function SearchSong() {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!searchTerm) return;
    facade
      .searchSongs(searchTerm)
      .then((res) => setSongs(res.body))
      .catch((err) => setError(facade.extractErrorMessage(err)));
  }, [searchTerm]);

  useEffect(() => {
    if (!facade.loggedIn()) return;
    facade
      .getPlaylists()
      .then((res) => setPlaylists(res.body))
      .catch((err) => setError(facade.extractErrorMessage(err)));
  }, []);

  const handleAddSong = async () => {
    if (!selectedSong || !selectedPlaylist) return;
    setAdding(true);
    setError(null);

    const playlistId = Number(selectedPlaylist);
    if (!Number.isFinite(playlistId) || playlistId <= 0) {
      setError("Invalid playlist id");
      setAdding(false);
      return;
    }

    try {
      console.log("Adding song", {
        playlistId,
        externalId: selectedSong.externalId,
      });

      await facade.addSongToPlaylist(playlistId, selectedSong.externalId);

      alert(`Added "${selectedSong.title}" to playlist!`);
      setSelectedSong(null);
      setSelectedPlaylist("");
    } catch (err) {
      const msg = facade.extractErrorMessage(err);
      console.error("Add song failed:", err);
      setError(msg || "Could not add song");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Search Song</h1>
      <div>
        <label htmlFor="search">
          Please type the name of the song or the artist
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {songs.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr
                key={song.externalId}
                onClick={() => setSelectedSong(song)}
                className={styles.clickableRow}
              >
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Search a song or artist!</p>
      )}

      {selectedSong && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Add "{selectedSong.title}" to a playlist</h3>

            <select
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
            >
              <option value="" disabled>
                Choose playlist
              </option>
              {playlists.map((pl) => (
                <option key={pl.id} value={pl.id}>
                  {pl.name}
                </option>
              ))}
            </select>

            <div className={styles.modalActions}>
              <button
                onClick={handleAddSong}
                disabled={!selectedPlaylist || adding}
              >
                {adding ? "Adding..." : "Add"}
              </button>
              <button
                onClick={() => {
                  setSelectedSong(null);
                  setSelectedPlaylist("");
                  setError(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
