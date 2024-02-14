import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/redirect.module.css";

export default function KakaoLogin() {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  const { code } = router.query;

  console.log(code);

  const sendCode = async () => {
    await axios
    .get(`/kakao/${code}`)
    .then((res) => {
      localStorage.setItem("accessToken", res.data);
      setOk(true);
    });
  }

  useEffect(() => {
    if (code) {
      sendCode();
    }
  }, [code]);

  useEffect(() => {
    if (ok) {
      router.push("/");
    }
  }, [ok])
  
  return (
    <div className={styles.login__redirect}>
      <h1>로그인 중...</h1>
    </div>
  )
}