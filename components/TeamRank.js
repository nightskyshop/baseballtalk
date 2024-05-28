import styles from "./TeamRank.module.css";

export default function TeamRank({ teamRanking }) {
	return (
		<table className={styles.team__rank_table}>
			<caption className={styles.team__rank_caption}>TEAM RANKING</caption>

			<thead className={styles.team__rank_thead}>
				<tr>
					<th scope="col">순위</th>
					<th scope="col">팀 이름</th>
					<th scope="col">경기수</th>
					<th scope="col">승/패/무</th>
					<th scope="col">승률</th>
				</tr>
			</thead>

			<tbody className={styles.team__rank_tbody}>
				{teamRanking.map((team, index) => (
					<tr key={index}>
						<th scope="row">{team.ranknum}.</th>
						<td>{team.teamname}</td>
						<td>{team.game}</td>
						<td>
							{team.win}/{team.lose}/{team.tie}
						</td>
						<td>{(team.winavg / 1000).toFixed(3)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
