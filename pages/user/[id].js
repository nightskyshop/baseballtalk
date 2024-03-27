import UserInfo from "@/components/UserInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/otherprofile.module.css";
import axios from "axios";
import Head from "next/head";

export async function getServerSideProps(context) {
  const id = context.params["id"];

  let user;
  try {
    const res = await axios.get(`/user/${id}`);
    user = res.data;
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
}

export default function OtherUserProfile({ user }) {
  if (!user) return <div>로딩 중...</div>;

  return (
    <div className={styles.otheruserprofile}>
      <Head>
        <title>{user.username}</title>
      </Head>

      <UserInfo user={user} />
    </div>
  );
}
