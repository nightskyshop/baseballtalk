import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SignupForm.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function SignupForm () {
  const KAKAO_API_URI = process.env.NEXT_PUBLIC_KAKAO_API_URI;
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const router = useRouter();

  const [signuped, setSignuped] = useState(false);
  const [emailCache, setEmailCache] = useState("");
  const [passwordCache, setPasswordCache] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.elements.namedItem("username").value;
    const team = form.elements.namedItem("team").value;
    const email = form.elements.namedItem("email").value;
    const password = form.elements.namedItem("password").value;
    const password_check = form.elements.namedItem("password_check").value;

    if (username === "" || team === "" || email === "" || password === "" || password_check === "") {
      window.alert("내용을 모두 적어주세요.");
    } else if (password !== password_check) {
      window.alert("비밀번호와 비밀번호 확인의 값이 다릅니다.");
    } else {
      await axios
        .post("/auth/signup", { id:0, username, team, email, password })
        .then((res) => {
          if (res.status == 201) {
            setSignuped(true);
          }
        });

      setEmailCache(email);
      setPasswordCache(password);
    }
  }

  const login = async () => {
    await axios
      .post("/auth/login", { email: emailCache, password: passwordCache })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("tokenExpiresIn", res.data.tokenExpiresIn);
        router.push("/");
      });
  };

  useEffect(() => {
    if (signuped && emailCache !== "" && passwordCache !== "") {
      login();
    }
  }, [signuped]);

  return (
    <div className={styles.signup__box}>
      <div className={styles.signup__header}>
        <h1 className={styles.signup__logo}>Signup</h1>

        <Link className={styles.signup__login} href="/login">로그인</Link>
      </div>

      <form className={styles.signup__form} onSubmit={onSubmit}>
        <p>활동명</p>
        <input 
          type="text"
          name="username"
          className={styles.signup__username}
        />

        <p>팀</p>
        <div className={styles.signup__team}>
          <select name="team">
            <option value="">------</option>
            <option vlaue="LG Twins">LG Twins</option>
            <option vlaue="KT Wiz">KT Wiz</option>
            <option vlaue="SSG Landers">SSG Landers</option>
            <option vlaue="NC Dinos">NC Dinos</option>
            <option vlaue="Doosan Bears">Doosan Bears</option>
            <option vlaue="KIA Tigers">KIA Tigers</option>
            <option vlaue="Lotte Giants">Lotte Giants</option>
            <option vlaue="Samsung Lions">Samsung Lions</option>
            <option vlaue="Hanwha Eagles">Hanwha Eagles</option>
            <option vlaue="Kiwoom Heros">Kiwoom Heros</option>
          </select>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>

        <p>이메일</p>
        <input 
          type="email"
          name="email"
          className={styles.signup__email}
        />

        <p>비밀번호</p>
        <input
          type="password"
          name="password"
          className={styles.signup__password}
        />

        <p>비밀번호 확인</p>
        <input
          type="password"
          name="password_check"
          className={styles.signup__password_check}
        />

        <button>회원가입</button>
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
}