import styles from "./UserInfo.module.css";
import ProfileImage from "./ProfileImage";

export default function UserInfo({ user }) {
  return (
    <div className={styles.info}>
      <div className={styles.info__box}>
        <ProfileImage url={user.image} width={130} height={130} />

        <div>
          <h1>{user.username}</h1>
          <p>{user.team}</p>
        </div>
      </div>

      <p className={`${user.introduce == null || user.introduce.trim() == "" ? styles.nocontent : ""} ${styles.info__introduce}`}>{user.introduce == null || user.introduce.trim() == "" ? "아직 소개글이 없습니다..." : user.introduce}</p>
    </div>
  )
};