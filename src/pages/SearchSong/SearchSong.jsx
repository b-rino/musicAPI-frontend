import styles from "./SearchSong.module.css";
import { useEffect, useState } from "react";
import facade from "../../../utils/apiFacade";

export default function SearchSong() {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;

    facade
      .searchSongs(searchTerm)
      .then((res) => setSongs(res.body))
      .catch((err) => setError(facade.extractErrorMessage(err)));
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>Search Song</div>
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
              <tr key={song.externalId}>
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
    </div>
  );
}
