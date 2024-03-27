import Post from "@/components/Post";
import getUser from "@/lib/getUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";

export async function getServerSideProps(context) {
  const id = context.params["id"];

  let post;
  try {
    const res = await axios.get(`/post/${id}`);
    post = res.data;
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}

export default function PostDetail({ post }) {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser });

  if (!post) {
    return (
      <div>
        <Head>
          <title>로딩 중...</title>
        </Head>

        <h1>로딩 중...</h1>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{post.title}</title>
      </Head>

      <Post post={post} />
    </div>
  );
}
