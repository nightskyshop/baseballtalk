import { useEffect, useState } from "react";
import PostList from "@/components/PostList";
import styles from "@/styles/post.module.css";
import axios from "axios";
import Head from "next/head";
import TeamList from "@/components/TeamList";
import Rank from "@/components/Rank";

export async function getServerSideProps() {
	const {
		data: { content: default_posts, totalPages },
	} = await axios.get(`/post?pageNo=0&pageSize=5`);
	const { data: teams } = await axios.get(`/team`);
	const { data: hitters } = await axios.get(`/hitter/avg?pageNo=0`);
	const { data: pitchers } = await axios.get(`/pitcher/era?pageNo=0`);

	return {
		props: {
			default_posts,
			totalPages,
			teams,
			hitters,
			pitchers,
		},
	};
}

export default function Posts({
	default_posts,
	totalPages,
	teams,
	hitters,
	pitchers,
}) {
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

	if (!posts || !teams || !hitters || !pitchers) return <div>로딩 중...</div>;

	return (
		<div className={styles.post}>
			<Head>
				<title>커뮤니티</title>
			</Head>

			<div className={styles.post_grid}>
				<Rank
					className={styles.rank}
					teamRanking={teams}
					hitterRanking={hitters.content}
					pitcherRanking={pitchers.content}
				/>
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
