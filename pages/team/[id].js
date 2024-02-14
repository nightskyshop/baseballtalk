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

export default function TeamDetail() {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser}).data;
  const router = useRouter();
  const { id } = router.query;

  const [team, setTeam] = useState({});
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  const getTeam = async () => {
    await axios
      .get(`/team/${id}`)
      .catch(setTeam(false))
      .then((res) => setTeam(res.data));
  }

  const getPosts = async () => {
    await axios
      .get(`http://localhost:8080/post/team/${id}?pageNo=${pageNo}`)
      .catch(setPosts(false))
      .then((res) => setPosts(res.data.content));
  };

  useEffect(() => {
    if (id) {
      getPosts();
      getTeam();
    }
  }, [id]);

  return (
    <div className={styles.team}>

      {
        team ? (
          <>
            <Head>
              <title>{team.teamname} 갤러리</title>
            </Head>

            <Team team={team} />
          </>
        ) : (
          <div>글이 없습니다.</div>
        )
      }
      {
        posts ? (
          <div className={styles.team__postlist}>
            { user ? team ? <Link href={`/post/create?team=${team.id}`}>글쓰기</Link> : null : null }
            <PostList posts={posts} />
          </div>
          ) : (
          <div>ERROR</div>
        )
      }
    </div>
  )
}