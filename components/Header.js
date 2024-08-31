import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import Link from "next/link";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

export default function Header() {
	const router = useRouter();

	const {
		data: user,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getUser,
	});

	const [dropdown, setDropdown] = useState(false);
	const [hamburger, setHamberger] = useState(false);
	const [nav, setNav] = useState(true);

	const handleMouseEnter = () => setDropdown(true);
	const handleMouseLeave = () => setDropdown(false);

	const handleNavClick = () => {
		setNav((prevNav) => !prevNav);
	};

	const handleClick = () => {
		if (hamburger) {
			setNav(false);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", () => {
			if (window.innerWidth < 615) {
				setHamberger(true);
				setNav(false);
			} else {
				setHamberger(false);
				setNav(true);
			}
		});
		if (window.innerWidth < 615) {
			setHamberger(true);
			setNav(false);
		}
	}, []);

	return (
		<header className={styles.header__border}>
			<div className={styles.header}>
				<div className={styles.header__logo}>
					<Link href="/">
						<Logo />
					</Link>
				</div>

				{hamburger ? (
					<FontAwesomeIcon
						icon={faBars}
						onClick={handleNavClick}
						className={`${styles.header__hamberger} fa-2xl`}
					/>
				) : null}

				{nav ? (
					<div className={styles.header__nav}>
						<ul className={styles.header__list}>
							<li className={styles.header__postlist}>
								<Link onClick={handleClick} href="/post">
									커뮤니티
								</Link>
							</li>

							<li className={styles.header_postcreate}>
								<Link onClick={handleClick} href="/post/create">
									커뮤니티 글쓰기
								</Link>
							</li>

							<li className={styles.header_datareferance}>
								<Link onClick={handleClick} href="/data-referance">
									데이터 자료실
								</Link>
							</li>
						</ul>

						<div className={styles.header__user}>
							{user ? (
								<>
									<Link
										onClick={handleClick}
										href="/logout"
										className={styles.header__logout}
									>
										로그아웃
									</Link>
									<div
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
										className={styles.header__profile}
									>
										<ProfileImage
											url={user.data.image}
											width={40}
											height={40}
										/>

										<div
											className={`${dropdown ? styles.show : ""} ${
												styles.header__dropdown
											}`}
										>
											<Link onClick={handleClick} href={"/user-profile"}>
												내 프로필
											</Link>
										</div>
									</div>
								</>
							) : (
								<>
									<Link
										onClick={handleClick}
										className={styles.header__login}
										href="/login"
									>
										로그인
									</Link>
									<Link
										onClick={handleClick}
										className={styles.header__signup}
										href="/signup"
									>
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
