import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import styles from "./ChatForm.module.css";

export default function ChatForm({ createChat }) {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;

  const handleResizeHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const content = form.elements.namedItem("content");

    if (!user) {
      alert("로그인 하세요");
    } else if (content.value.trim() == "") {
      alert("내용을 작성해주세요.");
    } else {
      await createChat(content.value);
    }

    content.value = "";
  };

  return (
    <form onSubmit={onSubmit} className={styles.chat__form}>
      <h1 className={styles.chat__form_header}>{user.data.username}</h1>
      <textarea
        className={styles.chat__form_input}
        type="text"
        placeholder="댓글을 남겨보세요."
        rows={1}
        onChange={handleResizeHeight}
        name="content"
      />
      <button className={styles.chat__form_button}>등록</button>
    </form>
  );
}
