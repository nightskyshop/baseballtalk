import styles from "./LoginForm.module.css";

export default function LoginForm() {
  return (
    <div className={styles.login__box}>
      <h1 className={styles.login__logo}>로고</h1>

      <form className={styles.login__form}>
        <input 
          type="email"
          placeholder="이메일"
          name="email"
          className={styles.login__email}
        />

        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          className={styles.login__password}
        />

        <button>로그인</button>
      </form>
    </div>
  )
};