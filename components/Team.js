import Image from "next/image";
import styles from "./Team.module.css";

export default function Team({ team }) {
  return (
    <div className={styles.team__info}>
      <Image src={`/images/${team.teamname}.png`} width={90} height={90} />

      <h1 className={styles.team__name}>{team.teamname}</h1>
      
      <div className={styles.team__text}>
        <p className={styles.team__rank}>{team.rank_num}위</p>
        <p className={styles.team__wlt}>{team.win}승 {team.lose}패 {team.tie}무</p>
      </div>
    </div>
  )
}