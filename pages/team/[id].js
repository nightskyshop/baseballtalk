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
  try {
    const res = await axios.get(`/team/${id}`);
    team = res.data;
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      team,
    },
  };
}

export default function TeamDetail({ team }) {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;
  const router = useRouter();

  const { id } = router.query;
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  const getPosts = async () => {
    await axios
      .get(`http://localhost:8080/post/team/${id}?pageNo=${pageNo}`)
      .catch(setPosts(false))
      .then((res) => setPosts(res.data.content));
  };

  useEffect(() => {
    if (id) {
      getPosts();
    }
  }, [id]);

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
        <PostList posts={posts} />
      </div>
    </div>
  );
}
