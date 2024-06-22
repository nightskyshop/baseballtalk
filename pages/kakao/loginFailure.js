import Link from "next/link";
import styles from "@/styles/loginFailure.module.css";

export default function LoginFailure() {
	return (
		<div className={styles.loginFailure}>
			일반 <Link href="/signup">회원가입</Link> 혹은{" "}
			<Link href="/login">로그인</Link>을 시도하거나 잠시 후에 시도해주세요 :(
		</div>
	);
}
