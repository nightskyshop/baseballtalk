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
  const [dropdown, setDropdown] = useState(false);

  const getChats = async () => {
    const { data: chats } = await axios.get(
      `/chat/post/${post.id}?pageNo=${pageNo}`
    );
    setChats(chats.content);
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

  const handleDropdownClick = (e) => {
    e.preventDefault();
    setDropdown((prevdropdown) => !prevdropdown);
  };

  const handleDropdownBlur = () => {
    setTimeout(() => {
      setDropdown(false);
    }, 100);
  };

  const handleDeleteClick = async (e) => {
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

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className={styles.post}>
      <div className={styles.post__post}>
        <div className={styles.post__tc}>
          <h1 className={styles.post__team}>{post.team.teamnameEn}</h1>-
          <p className={styles.post__category}>{post.category}</p>
        </div>
        <h1 className={styles.post__title}>{post.title}</h1>

        <div className={styles.post__author}>
          <Link
            href={`/user/${post.author.id}`}
            className={styles.post__author_link}
          >
            <ProfileImage url={post.author.image} width={60} height={60} />
          </Link>

          <div className={styles.post__author_text}>
            <div className={styles.post__author_names}>
              <p className={styles.post__author_username}>
                {post.author.username}
              </p>
              <p className={styles.post__author_team}> - {post.author.team}</p>
            </div>
            <p className={styles.post__created}>
              {post.createdAt[0]}년 {post.createdAt[1]}월 {post.createdAt[2]}일{" "}
              {String(post.createdAt[3]).padStart(2, "0")}:
              {String(post.createdAt[4]).padStart(2, "0")}
            </p>
          </div>
          {user ? (
            user.data.id == post.author.id ? (
              <button onClick={handleDropdownClick} onBlur={handleDropdownBlur}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            ) : null
          ) : null}

          <div
            className={`${styles.post__dropdown} ${
              dropdown ? styles.focus : ""
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
            <button
              className={styles.dropdown__delete}
              onClick={handleDeleteClick}
            >
              삭제하기
            </button>
          </div>
        </div>

        <hr />

        <p className={styles.post__content}>{post.content}</p>

        <Reaction post={post} chat_count={chats.length} />
      </div>

      <hr />

      {chats ? chats.length > 0 ? <ChatList chats={chats} /> : null : null}

      {user ? <ChatForm user={user} createChat={createChat} /> : null}
    </div>
  );
}
