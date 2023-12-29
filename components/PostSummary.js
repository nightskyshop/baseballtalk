import PostImage from "@/public/white.png";
import styles from "./PostSummary.module.css";
import Link from "next/link";
import Image from "next/image";

export default function PostSummary({ post, index }) {
  return (
    <div className={styles.postsummary} key={index}>
      <Link className={styles.postsummary__link} href={`/post/${post.id}`}>
        <div className={styles.postsummary__text}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
        <Image className={styles.postsummary__img} src={PostImage} width={100} height={70} alt="Post Image" />
      </Link>
    </div>
  )
}