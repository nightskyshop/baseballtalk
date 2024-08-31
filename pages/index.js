import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
	const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;

	// const router = useRouter();
	// router.push("/post");

	return (
		<div>
			<Head>
				<title>BaseballTalk</title>
			</Head>

			<h1>Initial Setting</h1>
		</div>
	);
}
