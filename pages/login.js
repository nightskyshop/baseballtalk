import { useRouter } from "next/router";
import LoginForm from "@/components/LoginForm";
import styles from "@/styles/login.module.css";

export default function Login() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (localStorage.getItem("accessToken")) {
      router.push("/");
    }
  }

  return (
    <main className={styles.login}>
      <LoginForm />
    </main>
  )
};