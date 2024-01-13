import Chat from "./Chat";
import styles from "./ChatList.module.css";

export default function ChatList({ chats }) {
  return (
    <div>
      {
        chats ? (
          <div className={styles.post__chat}>
            <h1 className={styles.chat__header}>댓글</h1>
            {chats.map((chat, index) => (
              <Chat key={index} chat={chat} index={index} />
            ))}
          </div>
        ) : null
      }
    </div>
  )
}