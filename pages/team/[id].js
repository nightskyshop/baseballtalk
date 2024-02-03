import PostList from "@/components/PostList";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/team.module.css";

export default function Team() {
  const router = useRouter();
  const { id } = router.query;

  const [team, setTeam] = useState({});
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  const getTeam = async () => {
    await axios
      .get(`http://localhost:8080/team/${id}`)
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
          <div className={styles.team__info}>
            <h1 className={styles.team__name}>{team.teamname}</h1>
            
            <div className={styles.team__text}>
              <p className={styles.team__rank}>{team.rank_num}위</p>
              <p className={styles.team__wlt}>{team.win}승 {team.lose}패 {team.tie}무</p>
            </div>
          </div>
        ) : <div>글이 없습니다.</div>
      }
      {
        posts ? (
          <PostList posts={posts} />
          ) : (
          <div>ERROR</div>
        )
      }
    </div>
  )
}