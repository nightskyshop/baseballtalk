import Image from "next/image.js";
import Chat from "./Chat.js";
import ChatForm from "./ChatForm.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "./Post.module.css";

export default function Post({ post, user }) {
  return (
    <div className={styles.post}>
      <div className={styles.post__post}>
        <h1 className={styles.post__team}>{post.author.team}</h1>
        <h1 className={styles.post__title}>{post.title}</h1>

        <div className={styles.post__author}>
          <Image src={post.author.profile__image} width={60} height={60} alt="Profile Image" />
          
          <div className={styles.post__author_text}>
            <p className={styles.post__author_username}>{post.author.username}</p>
            <p className={styles.post__created}>2023년 12월 28일 21:04</p>
          </div>

          <button>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>

        <hr />

        <p className={styles.post__content}>{post.content}</p>

        <div className={styles.post__reaction}>
          <p>좋아요 {post.likes}</p>
          <p>댓글 {post.chats ? post.chats.length : 0}</p>
        </div>
      </div>

      <hr />
      
      {
        post.chats ? (
          <div className={styles.post__chat}>
            <h1 className={styles.chat__header}>댓글</h1>
            {post.chats.map((chat, index) => (
              <Chat key={index} chat={chat} index={index} />
            ))}
          </div>
        ) : null
      }

      <ChatForm user={user} />
    </div>
  )
}