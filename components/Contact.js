import Link from "next/link";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <p className={styles.contact__text}>
        문의사항 or 오류 제보 등은 <br />
        <Link className={styles.contact__link} href="mailto:nightskyshop1023@naver.com">nightskyshop1023@naver.com</Link> <br />
        으로 연락바랍니다.
      </p>
    </div>
  )
}