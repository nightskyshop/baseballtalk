import styles from "./ProfileImage.module.css";

export default function ProfileImage({ url, width = 40, height = 40 }) {
  return (
    <img
      src={url}
      width={width}
      height={height}
      className={styles.profile__image}
      alt="Profile Image"
    />
  )
}