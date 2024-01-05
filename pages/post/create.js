import PostForm from "@/components/PostForm";
import styles from "@/styles/default.module.css";
import Head from "next/head";

export default function PostCreate() {
  return (
    <main className={styles.main}>
      <Head>
        <title>게시판 글쓰기</title>
      </Head>
      <PostForm />
    </main>
  )
}