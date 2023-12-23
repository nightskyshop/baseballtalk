import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PostFrom() {
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
    await createPost(title, content, 1);

    if (ok) {
      router.push("/post");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="제목"
        name="title"
      />

      <input
        type="text"
        placeholder="내용"
        name="content"
      />

      <button>입력</button>
    </form>
  )
};