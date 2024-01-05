import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./PostForm.module.css";

export default function PostForm() {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  const createPost = async (title, content, author) => {
    await axios.post("http://localhost:8080/post", {
      title, content, author
    })
      .then((res) => (
        res.status == 201 ? setOk(true) : setOk(false)
      ));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    const form = e.currentTarget;
    const title = form.elements.namedItem("title").value;
    const content = form.elements.namedItem("content").value;

    if (title == "" || content == "") {
      window.alert("제목과 내용을 채워주세요.")
    } else {
      await createPost(title, content, 1);
    }

    if (ok) {
      router.push("/post");
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.form__header}>
        <h1>게시판 글쓰기</h1>
        <button>등록</button>
      </div>

      <input
        type="text"
        placeholder="제목을 입력해 주세요."
        name="title"
        className={styles.form__title}
      />

      <textarea
        type="text"
        placeholder="내용을 입력해 주세요."
        name="content"
        className={styles.form__content}
      />
    </form>
  )
};