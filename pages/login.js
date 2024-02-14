import { useRouter } from "next/router";
import LoginForm from "@/components/LoginForm";
import styles from "@/styles/login.module.css";
import Head from "next/head";

export default function Login() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (localStorage.getItem("accessToken")) {
      router.push("/");
    }
  }

  return (
    <main className={styles.login}>
      <Head>
        <title>로그인</title>
      </Head>

      <LoginForm />
    </main>
  )
};