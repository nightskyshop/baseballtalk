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
				destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`, // API 서버 주소
			},
		];
	},
	reactStrictMode: true,
};

module.exports = nextConfig;
