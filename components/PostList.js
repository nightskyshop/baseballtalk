import PostSummary from "./PostSummary";
import styles from "./PostList.module.css";


export default function PostList({ posts }) {
  return (
    <div className={styles.list}>
      {
        posts.map((post, index) => (
          <PostSummary post={post} index={index} />
        ))
      }
    </div>
  )
}