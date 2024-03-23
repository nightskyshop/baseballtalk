import TeamSummary from "./TeamSummary";
import styles from "./TeamList.module.css";

export default function TeamList({ teams }) {
  return (
    <div className={styles.team__list}>
      {teams.map((team) => (
        <TeamSummary team={team} key={team.id} />
      ))}
    </div>
  );
}
