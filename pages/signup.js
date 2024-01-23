import { useRouter } from "next/router";
import SignupForm from "@/components/SignupForm";
import styles from "@/styles/signup.module.css";

export default function Signup() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (localStorage.getItem("accessToken")) {
      router.push("/");
    }
  }

  return (
    <main className={styles.signup}>
      <SignupForm />
    </main>
  )
}