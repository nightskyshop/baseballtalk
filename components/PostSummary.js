import styles from "./PostSummary.module.css";
import Link from "next/link";
import ProfileImage from "./ProfileImage";

export default function PostSummary({ post }) {
  return (
    <div className={styles.postsummary}>
      <Link className={styles.postsummary__link} href={`/post/${post.id}`}>
        <div className={styles.postsummary__text}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      </Link>

      <Link
        href={`/user/${post.author.id}`}
        className={styles.postsummary__author}
      >
        <div className={styles.postsummary__author_top}>
          <p className={styles.postsummary__author_username}>
            {post.author.username}
          </p>

          <ProfileImage url={post.author.image} width={50} height={50} />
        </div>

        <p className={styles.postsummary__created}>
          {post.createdAt[0]}.{post.createdAt[1]}.{post.createdAt[2]}{" "}
          {String(post.createdAt[3]).padStart(2, "0")}:
          {String(post.createdAt[4]).padStart(2, "0")}
        </p>
      </Link>
    </div>
  );
}
