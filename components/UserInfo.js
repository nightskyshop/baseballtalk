import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import styles from "./UserInfo.module.css";
import ProfileImage from "./ProfileImage";

export default function UserInfo() {
  const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;

  return (
    <div className={styles.info}>
      <div className={styles.info__box}>
        <ProfileImage url={user.data.image} width={130} height={130} />

        <div>
          <h1>{user.data.username}</h1>
          <p>{user.data.team}</p>
        </div>
      </div>

      <p className={`${user.data.introduce == null ? styles.nocontent : ""} ${styles.info__introduce}`}>{user.data.introduce == null ? "아직 소개글이 없습니다..." : user.data.introduce}</p>
    </div>
  )
};