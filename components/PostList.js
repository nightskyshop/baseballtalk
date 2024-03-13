import PostSummary from "./PostSummary";
import styles from "./PostList.module.css";

export default function PostList({ posts }) {
  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <PostSummary post={post} key={post.id} />
      ))}
    </div>
  );
}
