import { useRouter } from "next/router";
import SignupForm from "@/components/SignupForm";
import styles from "@/styles/signup.module.css";
import Head from "next/head";

export default function Signup() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (localStorage.getItem("accessToken")) {
      router.push("/");
    }
  }

  return (
    <main className={styles.signup}>
      <Head>
        <title>회원가입</title>
      </Head>

      <SignupForm />
    </main>
  )
}