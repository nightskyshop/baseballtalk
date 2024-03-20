import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFill } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import getUser from "@/lib/getUser.js";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import styles from "./Reaction.module.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function Reaction({ post, chat_count }) {
  const router = useRouter();
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;

  const [likeCount, setLikeCount] = useState(post.like_count);
  const [liked, setLiked] = useState(false);

  const onLikeClick = async (e) => {
    e.preventDefault();

    if (liked) {
      await axios.delete(
        `/like/${user.data.id}?type=0&post_id=${post.id}&chat_id=0`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setLikeCount((prevLikeCount) => (prevLikeCount -= 1));
    } else {
      if (!user) {
        router.push("/login");
      } else {
        await axios.post("/like", {
          user: user.data.id,
          type: 0,
          post: post.id,
        });
      }

      setLikeCount((prevLikeCount) => (prevLikeCount += 1));
    }

    setLiked((prevLiked) => !prevLiked);
  };

  const getLiked = async () => {
    await axios
      .get(
        `http://localhost:8080/like?user_id=${user.data.id}&type=0&post_id=${post.id}&chat_id=0`
      )
      .then((res) => setLiked(res.data));
  };

  useEffect(() => {
    if (likeCount < 0) {
      setLikeCount(0);
    }
  }, [likeCount]);

  useEffect(() => {
    if (user) {
      getLiked();
    }
  }, [user]);

  return (
    <div className={styles.post__reaction}>
      <p className={styles.post__like}>
        좋아요{" "}
        {liked ? (
          <FontAwesomeIcon onClick={onLikeClick} icon={faHeartFill} />
        ) : (
          <FontAwesomeIcon onClick={onLikeClick} icon={faHeart} />
        )}{" "}
        {likeCount}
      </p>
      <p className={styles.post__chat}>
        댓글 <FontAwesomeIcon icon={faComment} /> {chat_count ? chat_count : 0}
      </p>
    </div>
  );
}
