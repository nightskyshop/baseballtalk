import Image from "next/image";
import styles from "./SettingForm.module.css";

export default function SettingForm({ user }) {
  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.elements.namedItem("username").value;
    const email = form.elements.namedItem("email").value;
    const introduce = form.elements.namedItem("introduce").value;
    console.log(username, email, introduce);
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
              defaultValue={user.username}
              name="username"
            />
          </div>

          <Image src={user.profile_image} width={80} height={80} alt="Profile Image" />
        </div>

        <p>이메일 정보</p>
        <input
          defaultValue={user.email}
          className={styles.disabled__input}
          disabled
          name="email"
        />

        <p>소개글</p>
        <input
          defaultValue={user.introduce}
          name="introduce"
        />

        <button>저장</button>
      </form>
      
      <hr />
      
      <form className={styles.setting__password}  onSubmit={handlePasswordSubmit} >
        <h1>비민번호 변경</h1>

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