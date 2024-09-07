import Image from "next/image";
import styles from "./Team.module.css";
import TeamFeed from "./TeamFeed";

export default function Team({ team }) {
	return (
		<div className={styles.team__info}>
			<h1 className={styles.team__name}>{team.teamnameEn} 갤러리</h1>

			<TeamFeed teamId={team.id} />
		</div>
	);
}
