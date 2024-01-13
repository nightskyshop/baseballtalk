import PostForm from "@/components/PostForm";
import default_styles from "@/styles/default.module.css";
import Head from "next/head";

export default function PostCreate() {
  return (
    <div>
      <Head>
        <title>게시판 글쓰기</title>
      </Head>

      <PostForm />
    </div>
  )
}