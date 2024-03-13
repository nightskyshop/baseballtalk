import Image from "next/image";
import Link from "next/link";
import styles from "./TeamSummary.module.css";

export default function TeamSummary({ team }) {
  return (
    <div className={styles.team__summary}>
      <Link href={`/team/${team.id}`}>
        <Image
          src={`/images/${team.teamname}.png`}
          width={100}
          height={100}
          alt="Team Image"
          priority
        />
        <h1>{team.teamname}</h1>
      </Link>
    </div>
  );
}
