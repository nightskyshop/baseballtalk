import ProfilePic from "@/public/누나닮은오리프사.jpg";
import Navbar from "@/components/Navbar";
import SettingForm from "@/components/SettingForm";
import profile__styles from "@/styles/profile.module.css";
import Head from "next/head";

export default function Setting() {
  const user = {
    username: "Luna Kim",
    email: "yeju436@gmail.com",
    team: "LG Twins",
    introduce: "야구를 알면 인생이 보인다. 인생은 홈런 한 방.",
    profile_image: ProfilePic,
  };

  return (
    <div className={profile__styles.profile__main}>
      <Head>
        <title>내 프로필 - Setting</title>
      </Head>

      <Navbar selected_btn={3} />
      <SettingForm user={user} />
    </div>
  )
}