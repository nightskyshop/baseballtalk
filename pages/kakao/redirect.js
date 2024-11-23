import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/redirect.module.css";
import Head from "next/head";

export default function KakaoLogin() {
	const router = useRouter();

	useEffect(() => {
		const fragment = window.location.hash.substring(1); // '#'을 제외한 fragment 부분
		const params = new URLSearchParams(fragment);

		// 토큰 추출
		const accessToken = params.get("access_token");
		const tokenExpiresIn = params.get("token_expires_in");
		const refreshToken = params.get("refresh_token");
		const refreshTokenExpiresIn = params.get("refresh_token_expires_in");

		localStorage.setItem("accessToken", accessToken);
		localStorage.setItem("tokenExpiresIn", tokenExpiresIn);
		sessionStorage.setItem("refreshToken", refreshToken);
		sessionStorage.setItem("tokenExpiresIn", refreshTokenExpiresIn);

		router.push("/");
	}, []);

	return (
		<div className={styles.login__redirect}>
			<Head>
				<title>로그인 중...</title>
			</Head>

			<h1>로그인 중...</h1>
		</div>
	);
}
