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
import ProfileImage from "./ProfileImage.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";

export default function Post({ post }) {
  const router = useRouter();
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;
  const [chats, setChats] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [clicked, setClicked] = useState(false);

  console.log(post);

  const getChats = () => {
    axios
      .get(`chat/post/${post.id}?pageNo=${pageNo}`)
      .then((res) => setChats(res.data.content));
  };

  const createChat = async (content) => {
    await axios
      .post(
        "/chat",
        {
          content,
          post: post.id,
          author: user.data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          getChats();
        }
      });
  };

  const onDropdownClick = (e) => {
    e.preventDefault();
    setClicked((prevClicked) => !prevClicked);
  };

  const onDeleteClick = async (e) => {
    e.preventDefault();

    if (post) {
      await axios
        .delete(`/post/${post.id}`, {
          headers: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        })
        .then(() => router.push("/post"));
    }
  };

  useEffect(() => console.log(clicked), [clicked]);

  useEffect(() => {
    if (post) {
      getChats();
    }
  }, [post.id]);

  return (
    <div className={styles.post}>
      <div className={styles.post__post}>
        <div className={styles.post__tc}>
          <h1 className={styles.post__team}>{post.team.teamname}</h1>-
          <p className={styles.post__category}>{post.category}</p>
        </div>
        <h1 className={styles.post__title}>{post.title}</h1>

        <div className={styles.post__author}>
          <ProfileImage url={post.author.image} width={60} height={60} />

          <div className={styles.post__author_text}>
            <p className={styles.post__author_username}>
              {post.author.username}
            </p>
            <p className={styles.post__created}>
              {post.createdAt[0]}년 {post.createdAt[1]}월 {post.createdAt[2]}일{" "}
              {String(post.createdAt[3]).padStart(2, "0")}:
              {String(post.createdAt[4]).padStart(2, "0")}
            </p>
          </div>
          {user ? (
            user.data.id == post.author.id ? (
              <button onClick={onDropdownClick}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            ) : null
          ) : null}

          <div
            className={`${styles.post__dropdown} ${
              clicked ? styles.focus : ""
            }`}
          >
            <Link
              className={styles.dropdown__update}
              href={`/post/create?update=${true}&id=${post.id}&team=${
                post.team.id
              }&category=${post.category}&title=${post.title}&content=${
                post.content
              }`}
            >
              수정하기
            </Link>
            <button className={styles.dropdown__delete} onClick={onDeleteClick}>
              삭제하기
            </button>
          </div>
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
