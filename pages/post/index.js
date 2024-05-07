import { useEffect, useState } from "react";
import PostList from "@/components/PostList";
import TeamRank from "@/components/TeamRank";
import styles from "@/styles/post.module.css";
import axios from "axios";
import Head from "next/head";
import TeamList from "@/components/TeamList";

export async function getServerSideProps() {
	const {
		data: { content: default_posts, totalPages },
	} = await axios.get(`/post?pageNo=0&pageSize=5`);
	const { data: teams } = await axios.get(`/team`);

	return {
		props: {
			default_posts,
			totalPages,
			teams,
		},
	};
}

export default function Posts({ default_posts, totalPages, teams }) {
	const [posts, setPosts] = useState(default_posts);
	const [pageNo, setPageNo] = useState(0);

	const getPosts = async () => {
		const {
			data: { content },
		} = await axios.get(`/post?pageNo=${pageNo}&pageSize=5`);
		setPosts(content);
	};

	const handlePageChange = ({ selected }) => {
		setPageNo(selected);
	};

	useEffect(() => {
		getPosts();
	}, [pageNo]);

	if (!posts || !teams) return <div>로딩 중...</div>;

	return (
		<div className={styles.post}>
			<Head>
				<title>커뮤니티</title>
			</Head>

			<div className={styles.post_grid}>
				<TeamRank className={styles.rank} teamRanking={teams} />
				<PostList
					className={styles.list}
					posts={posts}
					totalPages={totalPages}
					handlePageChange={handlePageChange}
					pageNo={pageNo}
				/>
			</div>

			<TeamList teams={teams} />
		</div>
	);
}
