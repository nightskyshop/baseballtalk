import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./SettingForm.module.css";
import ProfileImage from "./ProfileImage";

export default function SettingForm() {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser}).data;

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.elements.namedItem("username").value;
    const email = form.elements.namedItem("email").value;
    const introduce = form.elements.namedItem("introduce").value;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
  };

  return(
    <div className={styles.setting}>
      <form className={styles.setting__userInfo}  onSubmit={handleUserInfoSubmit} >
        <h1 className={styles.userInfo__header}>기본정보</h1>

        <div className={styles.userInfo__name_img}>
          <div>
            <p>활동명</p>
            <input
              defaultValue={user.data.username}
              name="username"
            />
          </div>

          <div className={styles.userInfo__profileimg}>
            <ProfileImage url={user.data.image} width={80} height={80} />
            <FontAwesomeIcon icon={faPen} />
          </div>
        </div>

        <p>이메일 정보</p>
        <input
          defaultValue={user.data.email}
          className={styles.disabled__input}
          disabled
          name="email"
        />

        <p>소개글</p>
        <input
          defaultValue={user.data.introduce}
          name="introduce"
        />

        <button>저장</button>
      </form>
      
      <hr />
      
      <form className={styles.setting__password}  onSubmit={handlePasswordSubmit} >
        <h1 className={styles.password__header}>비민번호 변경</h1>

        <p className={styles.password__first_password}>기존 비밀번호</p>
        <input placeholder="········" type="password" />

        <p>새로운 비밀번호</p>
        <input placeholder="········" type="password" />

        <p>새로운 비밀번호 확인</p>
        <input placeholder="········" type="password" />

        <button>저장</button>
      </form>
    </div>
  )
};