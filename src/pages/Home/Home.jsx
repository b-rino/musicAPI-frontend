import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>The Music Hub</h1>
        <div className={styles.leftColumn}>
          <h3>
            Welcome to <strong>The Music Hub</strong>
          </h3>
          <br></br>
          <p className={styles.cursive}>
            Discover music. Build playlists. Explore your personal music
            library.
          </p>
          <br></br>
          <p>
            The Music Hub is a custom-built music platform featuring user
            authentication, playlist management, and live track search powered
            by an external music API. Log in to explore your playlists — or
            create an account to get started.
          </p>
        </div>
        <div className={styles.rightColumn}>
          <img src="/images/music.png" alt="Music" className={styles.image} />
        </div>
      </div>
    </>
  );
}
