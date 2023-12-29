import Image from "next/image";
import styles from "./UserInfo.module.css";

export default function UserInfo({ user }) {
  return (
    <div className={styles.info}>
      <div className={styles.info__box}>
        <Image
          src={user.profile_image}
          width={130}
          height={130}
          alt="Profile Image"
        />

        <div>
          <h1>{user.username}</h1>
          <p>{user.team}</p>
        </div>
      </div>

      <p className={styles.info__introduce}>{user.introduce}</p>
    </div>
  )
};