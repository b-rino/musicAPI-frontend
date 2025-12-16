import styles from "./Admin.module.css";
import { useOutletContext } from "react-router-dom";

export default function Admin() {
  const { userRole, loggedIn } = useOutletContext();

  if (!loggedIn || userRole !== "Admin") {
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Access Denied</h1>

        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Admin Panel</h1>
      <p>Welcome to the admin panel. Here you can manage the application.</p>
    </div>
  );
}
