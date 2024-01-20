import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import Navbar from "@/components/Navbar";
import SettingForm from "@/components/SettingForm";
import profile__styles from "@/styles/profile.module.css";
import Head from "next/head";

export default function Setting() {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser}).data;

  return (
    <div className={profile__styles.profile__main}>
      <Head>
        <title>내 프로필 - Setting</title>
      </Head>

      <Navbar selected_btn={3} />
      { user ? <SettingForm user={user} /> : null }
    </div>
  )
}