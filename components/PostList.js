import PostSummary from "./PostSummary";
import Pagination from "@/components/Pagination";
import styles from "./PostList.module.css";

export default function PostList({
  posts,
  totalPages,
  handlePageChange,
  pageNo,
}) {
  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <PostSummary post={post} key={post.id} />
      ))}

      <Pagination
        pageCount={totalPages}
        onPageChange={handlePageChange}
        currentPage={pageNo}
      />
    </div>
  );
}
