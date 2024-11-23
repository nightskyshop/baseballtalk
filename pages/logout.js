import { useRouter } from "next/router";

export default function Logout() {
	const router = useRouter();

	if (typeof window !== "undefined") {
		if (localStorage.getItem("accessToken")) {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("tokenExpiresIn");
			sessionStorage.removeItem("refreshToken");
			sessionStorage.removeItem("tokenExpiresIn");
			router.reload();
		}

		router.push("/");
	}

	return <div>logout</div>;
}
