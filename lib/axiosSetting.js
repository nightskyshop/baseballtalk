import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (typeof window !== "undefined") {
	if (
		localStorage.getItem("tokenExpiresIn") &&
		localStorage.getItem("tokenExpiresIn") < Date.now()
	) {
		localStorage.removeItem("tokenExpiresIn");
		localStorage.removeItem("accessToken");
	} else if (localStorage.getItem("accessToken")) {
		axios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${localStorage.getItem("accessToken")}`;
	}
}
