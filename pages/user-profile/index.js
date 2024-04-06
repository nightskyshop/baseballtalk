import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import profile_styles from "@/styles/profile.module.css";
import Head from "next/head";
import { useRouter } from "next/router";

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;

  console.log(id);

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
