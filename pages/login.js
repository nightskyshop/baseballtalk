import LoginForm from "@/components/LoginForm";
import styles from "@/styles/login.module.css";

export default function Login() {
  return (
    <main className={styles.login}>
      <LoginForm />
    </main>
  )
};