import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import profile__styles from "@/styles/profile.module.css";
import Head from "next/head";

export default function Help() {
  return (
    <div className={profile__styles.profile__main}>
      <Head>
        <title>내 프로필 - Help</title>
      </Head>

      <Navbar selected_btn={4} />
      <Contact />
    </div>
  )
}