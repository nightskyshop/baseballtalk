import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import profile_styles from "@/styles/profile.module.css";
import Head from "next/head";

export default function UserProfile() {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;

  return (
    <div className={profile_styles.profile__main}>
      <Head>
        <title>내 프로필 - User Info</title>
      </Head>

      <Navbar selected_btn={1} />
      {user ? <UserInfo user={user.data} /> : null}
    </div>
  );
}
