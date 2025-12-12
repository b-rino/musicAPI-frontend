import styles from "./SearchSong.module.css";
import { useEffect, useState } from "react";
import fetchData from "../../../utils/persistence";
export default function SearchSong() {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      fetchData(
        `https://music.brino.dk/api/v1/songs/search?query=${searchTerm}`,
        (data) => setSongs(data)
      );
    }
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
