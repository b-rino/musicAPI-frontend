import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>The Music API</h1>
        <div className={styles.leftColumn}>
          <p>
            Welcome to <strong>The Music API</strong> - the right place to
            listen to music
          </p>
          <p>
            <strong>Log in</strong> to create your own playlists
          </p>
          <p>
            If you are not yet an user please visit{" "}
            <strong>Register User</strong>
          </p>
        </div>
        <div className={styles.rightColumn}>
          <img src="/images/music.png" alt="Music" className={styles.image} />
        </div>
      </div>
    </>
  );
}
