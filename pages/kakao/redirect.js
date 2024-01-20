import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function KakaoLogin() {
  const router = useRouter();

  const { code } = router.query;

  console.log(code);

  const sendCode = async () => {
    await axios
    .get(`http://localhost:8080/kakao/${code}`)
    .then((res) => localStorage.setItem("accessToken", res.data));
  }

  useEffect(() => {
    if (code) {
      console.log(code);
      sendCode();
      router.push("/");
    }
  }, [code])
  
  return (
    <div>kakaologin</div>
  )
}