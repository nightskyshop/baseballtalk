import Image from "next/image";
import styles from "./Chat.module.css";

export default function Chat({ chat, index }) {
  return (
    <div key={index} className={styles.chat}>
      <Image src={chat.author.profile__image} width={50} height={50} />

      <div className={styles.chat__text}>
        <h1 className={styles.chat__author}>{chat.author.username}</h1>
        <p className={styles.chat__content}>{chat.content}</p>
        <p className={styles.chat__created}>2023년 12월 28일 21:13</p>
      </div>
    </div>
  );
};