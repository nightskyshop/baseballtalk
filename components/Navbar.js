import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar({ selected_btn }) {
  return (
    <nav className={styles.user__navbar}>
      <h1 className={styles.navbar__heading}>User Profile</h1>

      <div className={styles.navbar__list}>
        <Link
          className={selected_btn == 1 ? styles.navbar__selected : null}
          href="/user-profile"
        >
          User info
        </Link>

        <Link
          className={selected_btn == 2 ? styles.navbar__selected : null}
          href="/user-profile/post"
        >
          My post
        </Link>

        <Link
          className={selected_btn == 3 ? styles.navbar__selected : null}
          href="/user-profile/setting"
        >
          Setting
        </Link>

        <Link
          className={selected_btn == 4 ? styles.navbar__selected : null}
          href="/user-profile/help"
        >
          Help
        </Link>
      </div>
    </nav>
  );
}
