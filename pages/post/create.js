import PostForm from "@/components/PostForm";
import styles from "@/styles/create.module.css";

export default function PostCreate() {
  return (
    <section className={styles.create}>
      <PostForm />
    </section>
  )
}