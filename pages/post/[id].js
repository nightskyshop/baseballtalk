import Post from "@/components/Post";
import axios from "axios";
import Head from "next/head";
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

  if (post == undefined) {
    return (
      <div>
        <Head>
          <title>로딩 중...</title>
        </Head>
        <h1>로딩 중...</h1>
      </div>
    )
  } else {
    return (
      <div>
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
                <title>글이 없습니다...</title>
              </Head>

              <Post post={post} />
            </>
          )
        }
      </div>
    )
  }
}