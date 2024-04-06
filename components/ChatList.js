import Chat from "./Chat";
import styles from "./ChatList.module.css";
import Pagination from "./Pagination";

export default function ChatList({
  chats,
  totalPages,
  handlePageChange,
  pageNo,
}) {
  return (
    <div className={styles.post__chat}>
      <h1 className={styles.chat__header}>댓글</h1>
      {chats.map((chat, index) => (
        <Chat key={index} chat={chat} index={index} />
      ))}

      <Pagination
        pageCount={totalPages}
        onPageChange={handlePageChange}
        currentPage={pageNo}
      />
    </div>
  );
}
