import SignupForm from "@/components/SignupForm";
import styles from "@/styles/signup.module.css";

export default function Signup() {
  return (
    <main className={styles.signup}>
      <SignupForm />
    </main>
  )
}