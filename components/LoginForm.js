import styles from "./LoginForm.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginForm() {
  const KAKAO_API_URI = process.env.NEXT_PUBLIC_KAKAO_API_URI;
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const router = useRouter();

  const login = async (email, password) => {
    await axios
      .post("/auth/login", { email, password })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("tokenExpiresIn", res.data.tokenExpiresIn);
        router.push("/");
      })
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.namedItem("email").value;
    const password = form.elements.namedItem("password").value;
  
    if (email.trim() == "" || password.trim() == "") {
      window.alert("모든 항목을 입력해주세요.");
    } else {
      await login(email, password);
    }
  };

  return (
    <div className={styles.login__box}>
      <div className={styles.login__header}>
        <h1 className={styles.login__logo}>Login</h1>

        <Link className={styles.login__signup} href="/signup">회원가입</Link>
      </div>

      <form className={styles.login__form} onSubmit={onSubmit}>
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

      <hr className={styles.hr} />

      <div className={styles.social__login}>
        <a href={`${KAKAO_API_URI}/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`}>
          <Image
            className={styles.social__kakao}
            src="/images/kakao_login_image.png"
            alt="카카오 로그인"
            width={180}
            height={50}
          />
        </a>
      </div>
    </div>
  )
};