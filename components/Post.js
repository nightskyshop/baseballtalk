import ChatForm from "./ChatForm.js";
import ChatList from "./ChatList.js";
import Reaction from "./Reaction.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import getUser from "@/lib/getUser.js";
import { useQuery } from "@tanstack/react-query";
import styles from "./Post.module.css";
import axios from "axios";

export default function Post({ post }) {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;
  const [chats, setChats] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  const getChats = () => {
    axios
      .get(`http://localhost:8080/chat/post/${post.id}?pageNo=${pageNo}`)
      .then((res) => setChats(res.data.content));
  };

  const createChat = async (content) => {
    await axios
      .post("http://localhost:8080/chat", {
        content,
        post: post.id,
        author: user.id,
      })
      .then((res) => {
        if (res.status == 201) {
          getChats();
        }
      });
  };

  useEffect(() => {
    if (post) {
      getChats();
    }
  }, [post.id]);

  return (
    <div className={styles.post}>
      <div className={styles.post__post}>
        <div className={styles.post__tc}>
          <h1 className={styles.post__team}>{post.team}</h1>-
          <p className={styles.post__category}>{post.category}</p>
        </div>
        <h1 className={styles.post__title}>{post.title}</h1>

        <div className={styles.post__author}>
          <img
            src={post.author.image}
            width={60}
            height={60}
            alt="Profile Image"
          />

          <div className={styles.post__author_text}>
            <p className={styles.post__author_username}>
              {post.author.username}
            </p>
            <p className={styles.post__created}>
              {post.createdAt[0]}년 {post.createdAt[1]}월 {post.createdAt[2]}일{" "}
              {post.createdAt[3]}:{post.createdAt[4]}
            </p>
          </div>

          <button>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>

        <hr />

        <p className={styles.post__content}>{post.content}</p>

        <Reaction post={post} chat_count={chats.length} />
      </div>

      <hr />

      <ChatList chats={chats} />

      {user ? <ChatForm user={user} createChat={createChat} /> : null}
    </div>
  );
}
