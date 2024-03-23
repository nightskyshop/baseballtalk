import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styles from "./PostForm.module.css";
import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import uuid from "react-uuid";
import { useEffect, useState } from "react";

export default function PostForm() {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;
  const router = useRouter();
  const params = useSearchParams();

  const [teams, setTeams] = useState([]);
  const update = params.get("update");
  const id = params.get("id");
  const default_team = params.get("team");
  const default_category = params.get("category");
  const default_title = params.get("title");
  const default_content = params.get("content");

  console.log(default_team);

  const getTeams = async () => {
    const t = await axios.get(`/team`);
    setTeams(t.data);
  };

  const createPost = async (title, content, team, category, author) => {
    if (!update) {
      await axios
        .post(
          "/post",
          {
            title,
            content,
            team,
            category,
            author,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          res.status == 201
            ? router.push("/post")
            : window.alert("문제가 생겼습니다. 잠시후 시도해주세요.");
        });
    } else {
      await axios
        .patch(
          `/post/${id}`,
          {
            title,
            content,
            team,
            category,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          res.status == 200
            ? router.push("/post")
            : window.alert("문제가 생겼습니다. 잠시후 시도해주세요.");
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = form.elements.namedItem("title").value;
    const content = form.elements.namedItem("content").value;
    const team = form.elements.namedItem("team").value;
    const category = form.elements.namedItem("category").value;

    if (
      title.trim() == "" ||
      content.trim() == "" ||
      team == "" ||
      category == ""
    ) {
      window.alert("모든 항목을 입력해주세요.");
    } else {
      await createPost(title, content, team, category, user.data.id);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__header}>
        <h1>게시판 글쓰기</h1>
        <button>등록</button>
      </div>

      <div className={styles.form__team}>
        <div className={styles.form__selects}>
          <div className={styles.form__select}>
            <select
              name="team"
              key={uuid()}
              defaultValue={default_team ? default_team : ""}
            >
              <option value="">팀를 선택해주세요.</option>
              {/* <option value={1}>LG Twins</option>
              <option value={2}>KT Wiz</option>
              <option value={3}>SSG Landers</option>
              <option value={4}>NC Dinos</option>
              <option value={5}>Doosan Bears</option>
              <option value={6}>KIA Tigers</option>
              <option value={7}>Lotte Giants</option>
              <option value={8}>Samsung Lions</option>
              <option value={9}>Hanwha Eagles</option>
              <option value={10}>Kiwoom Heros</option> */}
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.teamnameEn}
                </option>
              ))}
              <option value={11}>관련 없음</option>
            </select>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>

          <div className={styles.form__select}>
            <select
              name="category"
              key={uuid()}
              defaultValue={default_category ? default_category : ""}
            >
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
          defaultValue={default_title ? default_title : ""}
        />
      </div>

      <div className={styles.form__content_box}>
        <textarea
          type="text"
          placeholder="내용을 입력해 주세요."
          name="content"
          className={styles.form__content}
          defaultValue={default_content ? default_content : ""}
        />
      </div>
    </form>
  );
}
