import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Chat.module.css";
import ProfileImage from "./ProfileImage";
import getUser from "@/lib/getUser.js";
import { useQuery } from "@tanstack/react-query";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Chat({ chat, index }) {
  const router = useRouter();
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;
  const [clicked, setClicked] = useState(false);

  const onDropdownClick = (e) => {
    e.preventDefault();
    setClicked((prevClicked) => !prevClicked);
  };

  const onUpdateClick = async (e) => {
    e.preventDefault();
  };

  const onDeleteClick = async (e) => {
    e.preventDefault();

    if (chat && user) {
      await axios.delete(`/chat/${chat.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    }
    router.reload();
  };

  return (
    <div key={index} className={styles.chat}>
      <ProfileImage url={chat.author.image} width={50} height={50} />

      <div className={styles.chat__text}>
        <div className={styles.chat__author}>
          <h1 className={styles.chat__authorname}>{chat.author.username}</h1>
          <p className={styles.chat__authorteam}> - {chat.author.team}</p>
        </div>

        <p className={styles.chat__content}>{chat.content}</p>

        <p className={styles.chat__created}>
          {chat.createdAt[0]}년 {chat.createdAt[1]}월 {chat.createdAt[2]}일{" "}
          {String(chat.createdAt[3]).padStart(2, "0")}:
          {String(chat.createdAt[4]).padStart(2, "0")}
        </p>
      </div>

      {user ? (
        user.data.id == chat.author.id ? (
          <button onClick={onDropdownClick}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        ) : null
      ) : null}

      <div
        className={`${styles.chat__dropdown} ${clicked ? styles.focus : ""}`}
      >
        <button className={styles.dropdown__update} onClick={onUpdateClick}>
          수정하기
        </button>
        <button className={styles.dropdown__delete} onClick={onDeleteClick}>
          삭제하기
        </button>
      </div>
    </div>
  );
}
