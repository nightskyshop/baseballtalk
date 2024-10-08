import PostList from "@/components/PostList";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/team.module.css";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import Team from "@/components/Team";
import Head from "next/head";

export async function getServerSideProps(context) {
	const id = context.params["id"];

	let team;
	let default_posts;
	let totalPages;
	try {
		const res = await axios.get(`/team/${id}`);
		team = res.data;

		const posts_res = await axios.get(`/post/team/${id}?pageNo=0&pageSize=5`);
		default_posts = posts_res.data.content;
		totalPages = posts_res.data.totalPages;
	} catch {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			team,
			default_posts,
			totalPages,
		},
	};
}

export default function TeamDetail({ team, default_posts, totalPages }) {
	const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;
	const router = useRouter();

	const { id } = router.query;
	const [posts, setPosts] = useState(default_posts);
	const [pageNo, setPageNo] = useState(0);

	const getPosts = async () => {
		const {
			data: { content },
		} = await axios.get(`/post/team/${id}?pageNo=${pageNo}&pageSize=5`);
		setPosts(content);
	};

	const handlePageChange = ({ selected }) => {
		setPageNo(selected);
	};

	useEffect(() => {
		getPosts();
	}, [pageNo]);

	if (!team || !posts) return <div>로딩 중...</div>;

	return (
		<div className={styles.team}>
			<Head>
				<title>{team.teamname} 갤러리</title>
			</Head>

			<Team team={team} />

			<div className={styles.team__postlist}>
				{user ? (
					team ? (
						<Link href={`/post/create?team=${team.id}`}>글쓰기</Link>
					) : null
				) : null}

				<PostList
					posts={posts}
					totalPages={totalPages}
					handlePageChange={handlePageChange}
					currentPage={pageNo}
				/>
			</div>
		</div>
	);
}
