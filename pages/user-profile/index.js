import ProfilePic from "@/public/누나닮은오리프사.jpg";
import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import styles from "@/styles/user-profile.module.css";

export default function UserProfile() {
  const user = {
    username: "Luna Kim",
    team: "LG Twins",
    introduce: "야구를 알면 인생이 보인다. 인생은 홈런 한 방.",
    profile_image: ProfilePic,
  };

  return (
    <main className={styles.user__info}>
      <Navbar selected_btn={1} />
      <UserInfo user={user} />
    </main>
  );
}