import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import Navbar from "@/components/Navbar";
import PostList from "@/components/PostList";
import Link from "next/link";
import styles from "@/styles/mypost.module.css";
import profile__styles from "@/styles/profile.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyPost() {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  const  getPosts = async () => {
    await axios
      .get(`http://localhost:8080/post/user/${user.data.id}?pageNo=${pageNo}`)
      .then((res) => setPosts(res.data.content))
  }

  useEffect(() => {
    if (user) {
      getPosts();
    }
  }, [user])

  return (
    <div className={profile__styles.profile__main}>
      <Head>
        <title>내 프로필 - My Post</title>
      </Head>

      <Navbar selected_btn={2} />
      <div className={styles.user__postlist}>
        <Link href="/post/create">글쓰기</Link>
        { posts != [] ? (
          <PostList posts={posts} />
          ) : (
            <div>작성한 글이 없습니다...(</div>
          ) }
      </div>
    </div>
  )
};