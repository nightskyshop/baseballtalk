import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Chat.module.css";
import ProfileImage from "./ProfileImage";
import getUser from "@/lib/getUser.js";
import { useQuery } from "@tanstack/react-query";
import { faCheck, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Chat({ chat, index }) {
  const router = useRouter();
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;

  const [clicked, setClicked] = useState(false);
  const [isUpdating, setIsUpdating] = useState();

  const handleResizeHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const onDropdownClick = (e) => {
    e.preventDefault();
    setClicked((prevClicked) => !prevClicked);
  };

  const onUpdateClick = async (e) => {
    e.preventDefault();

    setIsUpdating((prevClicked) => !prevClicked);
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

  const handleBlur = () => {
    setTimeout(() => {
      setIsUpdating(false);
    }, 1000);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const content = form.elements.namedItem("content").value;

    if (!user) {
      alert("로그인 하세요");
    } else if (content.trim() == "") {
      alert("내용을 작성해주세요.");
    } else {
      await axios.patch(
        `/chat/${chat.id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    }

    router.reload();
  };

  return (
    <div key={index} className={styles.chat}>
      <Link
        href={`/user/${chat.author.id}`}
        className={styles.chat__author_link}
      >
        <ProfileImage url={chat.author.image} width={50} height={50} />
      </Link>

      <div className={styles.chat__text}>
        <div className={styles.chat__author}>
          <h1 className={styles.chat__authorname}>{chat.author.username}</h1>
          <p className={styles.chat__authorteam}> - {chat.author.team}</p>
        </div>

        {!isUpdating ? (
          <p className={styles.chat__content}>{chat.content}</p>
        ) : (
          <form onSubmit={onSubmit} className={styles.chat__update_form}>
            <textarea
              className={styles.chat__form_input}
              type="text"
              placeholder="댓글을 수정해주세요."
              rows={1}
              onChange={handleResizeHeight}
              onFocus={handleResizeHeight}
              onBlur={handleBlur}
              autoFocus
              defaultValue={chat.content}
              name="content"
            />
            <button className={styles.chat__form_button}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </form>
        )}

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
