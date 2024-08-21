import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/redirect.module.css";
import Head from "next/head";

export default function KakaoLogin() {
	const [ok, setOk] = useState(false);
	const router = useRouter();

	const { code } = router.query;

	const sendCode = async () => {
		const { data } = await axios.get(`/login/kakao?code=${code}`);

		localStorage.setItem("accessToken", data.accessToken);
		localStorage.setItem("tokenExpiresIn", data.tokenExpiresIn);
		setOk(true);
	};

	useEffect(() => {
		if (code) {
			sendCode();
		}
	}, [code]);

	useEffect(() => {
		if (ok) {
			router.push("/");
		}
	}, [ok]);

	return (
		<div className={styles.login__redirect}>
			<Head>
				<title>로그인 중...</title>
			</Head>

			<h1>로그인 중...</h1>
		</div>
	);
}
