import ProfilePic from "@/public/누나닮은오리프사.jpg";
import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import profile_styles from "@/styles/profile.module.css";
import Head from "next/head";

export default function UserProfile() {
  const user = {
    username: "Luna Kim",
    team: "LG Twins",
    introduce: "야구를 알면 인생이 보인다. 인생은 홈런 한 방.",
    profile_image: ProfilePic,
  };

  return (
    <main className={profile_styles.profile__main}>
      <Head>
        <title>내 계정 - 유저 정보</title>
      </Head>

      <Navbar selected_btn={1} />
      <UserInfo user={user} />
    </main>
  );
}