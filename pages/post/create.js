import PostForm from "@/components/PostForm";
import styles from "@/styles/create.module.css";
import Head from "next/head";

export default function PostCreate() {
  return (
    <main className={styles.create}>
      <Head>
        <title>게시판 글쓰기</title>
      </Head>
      <PostForm />
    </main>
  )
}