import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styles from "./PostForm.module.css";
import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import axios from "axios";

export default function PostForm() {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser}).data;
  const router = useRouter();

  const createPost = async (title, content, team, category, author) => {
    await axios
      .post("http://localhost:8080/post", {
        title, content, team, category, author
      })
      .then((res) => {
        res.status == 201 ? (
          router.push("/post")
        ) : (
          window.alert("문제가 생겼습니다. 잠시후 시도해주세요.")
        )
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = form.elements.namedItem("title").value;
    const content = form.elements.namedItem("content").value;
    const team = form.elements.namedItem("team").value;
    const category = form.elements.namedItem("category").value;

    if (title == "" || content == "" || team == "" || category == "") {
      window.alert("제목과 내용을 채워주세요.")
    } else {
      await createPost(title, content, team, category, user.data.id);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.form__header}>
        <h1>게시판 글쓰기</h1>
        <button>등록</button>
      </div>

      <div className={styles.form__team}>
        <div className={styles.form__selects}>
          <div className={styles.form__select}>
            <select name="team">
              <option value="">팀를 선택해주세요.</option>
              <option value={1}>LG Twins</option>
              <option value={2}>KT Wiz</option>
              <option value={3}>SSG Landers</option>
              <option value={4}>NC Dinos</option>
              <option value={5}>Doosan Bears</option>
              <option value={6}>KIA Tigers</option>
              <option value={7}>Lotte Giants</option>
              <option value={8}>Samsung Lions</option>
              <option value={9}>Hanwha Eagles</option>
              <option value={10}>Kiwoom Heros</option>
              <option value={11}>관련 없음</option>
            </select>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          
          <div className={styles.form__select}>
            <select name="category">
              <option value="">주제를 선택해주세요.</option>
              <option value="팀/선수">팀/선수</option>
              <option value="경기">경기</option>
              <option value="플레이">플레이</option>
              <option value="국제대회">국제대회</option>
              <option value="기타">기타</option>
            </select>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>

        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          name="title"
          className={styles.form__title}
        />
      </div>

      <div className={styles.form__content_box}>
        <textarea
          type="text"
          placeholder="내용을 입력해 주세요."
          name="content"
          className={styles.form__content}
        />
      </div>
    </form>
  )
};