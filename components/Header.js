import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import Link from "next/link";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  console.log(data, isLoading, error);

  const [dropdown, setDropdown] = useState(false);
  const [hamburger, setHamberger] = useState(false);
  const [nav, setNav] = useState(true);

  const onMouseEnter = () => setDropdown(true);
  const onMouseLeave = () => setDropdown(false);

  const onNavClick = () => {
    setNav((prevNav) => !prevNav);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 560) {
        setHamberger(true);
      } else {
        setHamberger(false);
        setNav(true);
      }
    });
  }, []);

  return (
    <header className={styles.header__border}>
      <div className={styles.header}>
        <div className={styles.header__logo}>
          <Link href="/">로고</Link>
        </div>

        {hamburger ? (
          <FontAwesomeIcon
            icon={faBars}
            onClick={onNavClick}
            className={styles.header__hamberger}
          />
        ) : null}

        {nav ? (
          <div className={styles.header__nav}>
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
              {data ? (
                <>
                  <Link href="/logout" className={styles.header__logout}>
                    로그아웃
                  </Link>
                  <div
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    className={styles.header__profile}
                  >
                    <ProfileImage
                      url={data.data.image}
                      width={35}
                      height={35}
                    />

                    <div
                      className={`${dropdown ? styles.show : ""} ${
                        styles.header__dropdown
                      }`}
                    >
                      <Link href="/user-profile">내 프로필</Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link className={styles.header__login} href="/login">
                    로그인
                  </Link>
                  <Link className={styles.header__signup} href="/signup">
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
