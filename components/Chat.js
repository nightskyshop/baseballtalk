import styles from "./Chat.module.css";
import ProfileImage from "./ProfileImage";

export default function Chat({ chat, index }) {
  return (
    <div key={index} className={styles.chat}>
      <ProfileImage url={chat.author.image} width={50} height={50} />

      <div className={styles.chat__text}>
        <h1 className={styles.chat__author}>{chat.author.username}</h1>
        <p className={styles.chat__content}>{chat.content}</p>
        <p className={styles.chat__created}>
        {chat.createdAt[0]}년 {chat.createdAt[1]}월 {chat.createdAt[2]}일 {chat.createdAt[3]}:{chat.createdAt[4]}
        </p>
      </div>
    </div>
  );
};