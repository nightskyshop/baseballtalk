import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/">로고</Link>
      </div>

      <ul className={styles.header__list}>
        <li className={styles.header__postlist}>
          <Link href="/post">게시판</Link>
        </li>

        <li className={styles.header_postcreate}>
          <Link href="/post/create">게시판 글쓰기</Link>
        </li>

        <li className={styles.header_datareferance}>
          <Link href="/data-referance">데이터 자료실</Link>
        </li>
      </ul>

      <div className={styles.header__user}>
        <Link className={styles.header__login} href="/login">로그인</Link>
        <Link className={styles.header__signup} href="/signup">회원가입</Link>

        {/* <Link href="/logout" className={styles.header__user}>로그아웃</Link>
        <Link href="/프로필" className={styles.header__profileimg}>
          프로필 이미지
        </Link> */}
      </div>
    </header>
  )
}