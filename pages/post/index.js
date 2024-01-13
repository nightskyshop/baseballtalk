import { useEffect, useState } from "react";
import PostList from "@/components/PostList";
import TeamRank from "@/components/TeamRank";
import default_styles from "@/styles/default.module.css";
import styles from "@/styles/post.module.css";
import axios from "axios";
import Head from "next/head";

export default function Posts() {
  const teamRanking = [
    {
      rank: 1,
      name: "LG",
      game: 144,
      win: 86,
      lose: 56,
      tie: 2,
      winavg: 0.606
    },
    {
      rank: 2,
      name: "KT",
      game: 144,
      win: 79,
      lose: 56,
      tie: 2,
      winavg: 0.560
    },
    {
      rank: 3,
      name: "SSG",
      game: 144,
      win: 76,
      lose: 65,
      tie: 3,
      winavg: 0.539
    },
    {
      rank: 4,
      name: "NC",
      game: 144,
      win: 75,
      lose: 67,
      tie: 2,
      winavg: 0.528
    },
    {
      rank: 5,
      name: "두산",
      game: 144,
      win: 74,
      lose: 68,
      tie: 2,
      winavg: 0.521
    },
    {
      rank: 6,
      name: "KIA",
      game: 144,
      win: 73,
      lose: 69,
      tie: 2,
      winavg: 0.514
    },
    {
      rank: 7,
      name: "롯데",
      game: 144,
      win: 68,
      lose: 76,
      tie: 0,
      winavg: 0.472
    },
    {
      rank: 8,
      name: "삼성",
      game: 144,
      win: 611,
      lose: 82,
      tie: 1,
      winavg: 0.427
    },
    {
      rank: 9,
      name: "한화",
      game: 144,
      win: 58,
      lose: 80,
      tie: 6,
      winavg: 0.420
    },
    {
      rank: 10,
      name: "키움",
      game: 144,
      win: 58,
      lose: 83,
      tie: 4,
      winavg: 0.411
    },
  ]

  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  
  async function getPosts() {
    const p = await axios.get(`http://localhost:8080/post?pageNo=${pageNo}`);
    setPosts(p.data.content);
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div className={styles.post}>
      <Head>
        <title>게시판</title>
      </Head>

      <div className={styles.post_grid}>
        <TeamRank className={styles.rank} teamRanking={teamRanking} />
        <PostList className={styles.list} posts={posts} />
      </div>
    </div>
  )
}