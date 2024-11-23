import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getAccessTokenFromRefreshToken() {
	const { data } = await axios
		.get(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/refreshToken`, {
			headers: {
				RefreshToken: `Bearer ${sessionStorage.getItem("refreshToken")}`,
				"Content-Type": "application/json",
				"Cache-Control": "no-cache",
			},
			withCredentials: true,
		})
		.catch((error) => {
			console.error("Error:", error);
		});

	return data;
}

async function handleRefreshKey() {
	if (typeof window !== "undefined") {
		if (
			sessionStorage.getItem("tokenExpiresIn") &&
			sessionStorage.getItem("tokenExpiresIn") < Date.now()
		) {
			localStorage.removeItem("tokenExpiresIn");
			localStorage.removeItem("accessToken");
			sessionStorage.removeItem("refreshToken");
			sessionStorage.removeItem("tokenExpiresIn");
		} else if (
			(localStorage.getItem("tokenExpiresIn") &&
				localStorage.getItem("tokenExpiresIn") < Date.now()) ||
			(sessionStorage.getItem("refreshToken") &&
				!localStorage.getItem("accessToken"))
		) {
			localStorage.removeItem("tokenExpiresIn");
			localStorage.removeItem("accessToken");

			const data = await getAccessTokenFromRefreshToken();

			localStorage.setItem("accessToken", data.accessToken);
			localStorage.setItem("tokenExpiresIn", data.tokenExpiresIn);
		}
	}
}

handleRefreshKey();

axios.interceptors.request.use(async (config) => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem("accessToken")) {
			config.headers["Authorization"] = `Bearer ${localStorage.getItem(
				"accessToken"
			)}`;
		}
	}
	return config;
});

let isRefreshing = false;
let failedQueue = [];

// 요청 큐 처리 함수
const processQueue = (error, token = null) => {
	failedQueue.forEach((prom) => {
		if (token) {
			prom.resolve(token);
		} else {
			prom.reject(error);
		}
	});
	failedQueue = [];
};

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.data.message ==
				'401 UNAUTHORIZED "만료된 JWT access 토큰입니다."' &&
			!originalRequest._retry
		) {
			console.log("success");
			originalRequest._retry = true;

			if (!isRefreshing) {
				localStorage.removeItem("tokenExpiresIn");
				localStorage.removeItem("accessToken");

				const data = await getAccessTokenFromRefreshToken();

				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("tokenExpiresIn", data.tokenExpiresIn);

				processQueue(null, data.accessToken);

				isRefreshing = false;
			}

			return new Promise((resolve, reject) => {
				failedQueue.push({
					resolve: (token) => {
						originalRequest.headers["Authorization"] = `Bearer ${token}`;
						resolve(axios(originalRequest)); // 원래 요청 재시도
					},
					reject: (err) => {
						reject(err);
					},
				});
			});
		}

		return Promise.reject(error);
	}
);
