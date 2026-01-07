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
          <br></br>
          <p>You can explore the full source code here:</p>
          <ul className={styles.githubList}>
            <li>
              <a
                href="https://github.com/b-rino/musicAPI-frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                Frontend Repository
              </a>
            </li>
            <li>
              <a
                href="https://github.com/b-rino/MusicAPI"
                target="_blank"
                rel="noopener noreferrer"
              >
                Backend Repository
              </a>
            </li>
          </ul>
          <p>Use the admin login to explore the full experience:</p>
          <p>
            <strong>Username:</strong> Admin
            <br />
            <strong>Password:</strong> Admin
          </p>
          <br></br>
          <p>
            <strong>Disclaimer:</strong> This project is built exclusively for
            educational purposes and does not contain any sensitive data.
          </p>
        </div>
        <div className={styles.rightColumn}>
          <img src="/images/music.png" alt="Music" className={styles.image} />
        </div>
      </div>
    </>
  );
}
