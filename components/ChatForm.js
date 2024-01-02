import styles from "./ChatForm.module.css";

export default function ChatForm({ user }) {
  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const chat = form.elements.namedItem("chat");

    console.log(chat.value);
    chat.value = "";
  }

  return (
    <form onSubmit={onSubmit} className={styles.chat__form}>
      <h1 className={styles.chat__form_header}>{user.username}</h1>
      <input
        className={styles.chat__form_input}
        type="text"
        placeholder="댓글을 남겨보세요."
        name="chat"
      />
      <button className={styles.chat__form_button}>등록</button>
    </form>
  )
}