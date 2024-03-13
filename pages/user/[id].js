import UserInfo from "@/components/UserInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/otherprofile.module.css";
import axios from "axios";
import Head from "next/head";

export default function OtherUserProfile() {
  const [user, setUser] = useState(undefined);

  const router = useRouter();
  const { id } = router.query;

  const getUser = async () => {
    await axios
      .get(`/user/${id}`)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        window.alert("잘못된 접근입니다.");
        router.push("/post");
      });
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  return (
    <div className={styles.otheruserprofile}>
      {user ? (
        <>
          <Head>
            <title>{user.username}</title>
          </Head>

          <UserInfo user={user} />
        </>
      ) : null}
    </div>
  );
}
