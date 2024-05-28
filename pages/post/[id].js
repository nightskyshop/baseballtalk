import Post from "@/components/Post";
import getUser from "@/lib/getUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";

export async function getServerSideProps(context) {
	const id = context.params["id"];

	let post;
	let chats;
	let totalPages;
	try {
		const res = await axios.get(`/post/${id}`);
		post = res.data;

		const chats_res = await axios.get(`/chat/post/${id}?pageNo=0`);
		chats = chats_res.data.content;
		totalPages = chats_res.data.totalPages;
	} catch {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			post,
			chats,
			totalPages,
		},
	};
}

export default function PostDetail({ post, chats, totalPages }) {
	const user = useQuery({ queryKey: ["user"], queryFn: getUser });

	if (!post) {
		return (
			<div>
				<Head>
					<title>로딩 중...</title>
				</Head>

				<h1>로딩 중...</h1>
			</div>
		);
	}

	return (
		<div>
			<Head>
				<title>{post.title}</title>
			</Head>

			<Post post={post} chats={chats} totalPages={totalPages} />
		</div>
	);
}
