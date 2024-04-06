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
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(0);

  const getPosts = async () => {
    const {
      data: { content, totalPages: default_totalPages },
    } = await axios.get(
      `/post/user/${user.data.id}?pageNo=${pageNo}&pageSize=5`
    );
    setPosts(content);
    setTotalPages(default_totalPages);
  };

  const handlePageChange = ({ selected }) => {
    setPageNo(selected);
  };

  useEffect(() => {
    if (user) getPosts();
  }, [pageNo, user]);

  return (
    <div className={profile__styles.profile__main}>
      <Head>
        <title>내 프로필 - My Post</title>
      </Head>

      <Navbar selected_btn={2} />
      <div className={styles.user__postlist}>
        <Link href="/post/create">글쓰기</Link>
        {posts != [] ? (
          <PostList
            posts={posts}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            pageNo={pageNo}
          />
        ) : (
          <div>작성한 글이 없습니다...(</div>
        )}
      </div>
    </div>
  );
}
