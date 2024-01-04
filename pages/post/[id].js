import Post from "@/components/Post";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/default.module.css";
import ProfilePic from "@/public/누나닮은오리프사.jpg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(undefined);

  const getPost = async() => {
    await axios.get(`http://localhost:8080/post/${id}`)
      .catch(setPost(false))
      .then((res) => (setPost(res.data)))
  };

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);
  

  const user = {
    username: "Luna Kim",
    team: "LG Twins",
    profile__image: ProfilePic
  };

  if (post == undefined) {
    return (
      <div className={styles.main}>
        <Head>
          <title>로딩 중...</title>
        </Head>
        <h1>로딩 중...</h1>
      </div>
    )
  } else {
    return (
      <div className={styles.main}>
        {
          post == false ? (
            <>
              <Head>
                <title>글이 없습니다...</title>
              </Head>

              <h1>글이 없습니다... :(</h1>
            </>
          ) : (
            <>
              <Head>
                <title>{post.title}</title>
              </Head>

              <Post post={post} user={user} />
            </>
          )
        }
      </div>
    )
  }
}