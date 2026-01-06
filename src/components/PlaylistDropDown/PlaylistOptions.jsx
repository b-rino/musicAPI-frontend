import { useState } from "react";
import styles from "./PlaylistOptions.module.css";

export default function PlaylistOptions({ playlist, onRename, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.menuWrapper}>
      <button
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        ✏️
      </button>

      {open && (
        <div className={styles.dropDown}>
          <button onClick={() => onRename(playlist)}>Rename</button>
          <button onClick={() => onDelete(playlist.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
