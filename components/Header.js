import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;

  return (
    <header className={styles.header__border}>
      <div className={styles.header}>
        <div className={styles.header__logo}>
          <Link href="/">로고</Link>
        </div>

        <ul className={styles.header__list}>
          <li className={styles.header__postlist}>
            <Link href="/post">커뮤니티</Link>
          </li>

          <li className={styles.header_postcreate}>
            <Link href="/post/create">커뮤니티 글쓰기</Link>
          </li>

          <li className={styles.header_datareferance}>
            <Link href="/data-referance">데이터 자료실</Link>
          </li>
        </ul>

        <div className={styles.header__user}>
          { user ? (
            <>
              <Link href="/logout" className={styles.header__logout}>로그아웃</Link>
              <Link href="/user-profile" className={styles.header__profile}>
                <img src={`data:image/png;base64,${user.data.image}`} width={35} height={35} />
              </Link>
            </>
          ) : (
            <>
              <Link className={styles.header__login} href="/login">로그인</Link>
              <Link className={styles.header__signup} href="/signup">회원가입</Link>
            </>
          ) }
        </div>
      </div>

    </header>
  )
}