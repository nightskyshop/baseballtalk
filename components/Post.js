import ChatForm from "./ChatForm.js";
import ChatList from "./ChatList.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Image from "next/image.js";
import styles from "./Post.module.css";
import axios from "axios";

export default function Post({ post, user }) {
  const [chats, setChats] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  const getChats = () => {
    axios
      .get(`http://localhost:8080/chat/post/${post.id}?pageNo=${pageNo}`)
      .then((res) => setChats(res.data.content));
  };

  useEffect(() => {
    if (post) {
      getChats();
    }
  }, [post]);

  return (
    <div className={styles.post}>
      <div className={styles.post__post}>
        <h1 className={styles.post__team}>{post.author.team}</h1>
        <h1 className={styles.post__title}>{post.title}</h1>

        <div className={styles.post__author}>
          <img src={post.author.image} width={60} height={60} alt="Profile Image" />
          
          <div className={styles.post__author_text}>
            <p className={styles.post__author_username}>{post.author.username}</p>
            <p className={styles.post__created}>2023년 12월 28일 21:04</p>
          </div>

          <button>
            <FontAwesomeIcon icon={faEllipsisVertical}/>
          </button>
        </div>

        <hr />

        <p className={styles.post__content}>{post.content}</p>

        <div className={styles.post__reaction}>
          <p>좋아요 {post.likes}</p>
          <p>댓글 {post.chat ? post.chat.length : 0}</p>
        </div>
      </div>

      <hr />

      <ChatList chats={chats} />

      <ChatForm user={user} />
    </div>
  )
}