import { useEffect, useState } from "react";
import PostList from "@/components/PostList";
import TeamRank from "@/components/TeamRank";
import styles from "@/styles/post.module.css";
import axios from "axios";
import Head from "next/head";
import TeamList from "@/components/TeamList";

export async function getServerSideProps() {
  const { data: teams } = await axios.get(`/team`);

  return {
    props: {
      teams,
    },
  };
}

export default function Posts({ teams }) {
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  const getPosts = async () => {
    const p = await axios.get(`/post?pageNo=${pageNo}`);
    setPosts(p.data.content);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styles.post}>
      <Head>
        <title>커뮤니티</title>
      </Head>

      <div className={styles.post_grid}>
        <TeamRank className={styles.rank} teamRanking={teams} />
        <PostList className={styles.list} posts={posts} />
      </div>

      <TeamList teams={teams} />
    </div>
  );
}
