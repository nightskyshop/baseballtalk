/** @type {import('next').NextConfig} */

const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/",
				destination: "/post",
			},
			{
				source: "/api/:path*",
				destination: "http://localhost:8080/:path*", // API 서버 주소
			},
		];
	},
	reactStrictMode: true,
};

module.exports = nextConfig;
