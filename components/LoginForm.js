import Link from "next/link";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  return (
    <div className={styles.login__box}>
      <div className={styles.login__header}>
        <h1 className={styles.login__logo}>Login</h1>

        <Link className={styles.login__signup} href="/signup">회원가입</Link>
      </div>

      <form className={styles.login__form}>
        <p>이메일</p>
        <input 
          type="email"
          name="email"
          className={styles.login__email}
        />

        <p>비밀번호</p>
        <input
          type="password"
          name="password"
          className={styles.login__password}
        />

        <button>로그인</button>
      </form>
    </div>
  )
};