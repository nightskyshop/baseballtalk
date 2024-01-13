import PostForm from "@/components/PostForm";
import default_styles from "@/styles/default.module.css";
import Head from "next/head";

export default function PostCreate() {
  return (
    <div>
      <Head>
        <title>커뮤니티 글쓰기</title>
      </Head>

      <PostForm />
    </div>
  )
}