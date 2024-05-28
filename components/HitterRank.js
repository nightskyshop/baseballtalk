import Image from "next/image";
import styles from "./HitterRank.module.css";

export default function HitterRank({ hitterRanking }) {
	console.log(hitterRanking);

	return (
		<table className={styles.hitter__rank_table}>
			<caption className={styles.hitter__rank_caption}>타자 순위</caption>

			<thead className={styles.hitter__rank_thead}>
				<tr>
					<th scope="col">순위</th>
					<th scope="col"></th>
					<th scope="col">팀</th>
					<th scope="col">이름</th>
					<th scope="col">타율</th>
				</tr>
			</thead>

			<tbody className={styles.hitter__rank_tbody}>
				{hitterRanking.map((hitter, index) => (
					<tr key={index}>
						<th scope="row">{index + 1}.</th>
						<td>
							<img
								width={40}
								height={52}
								src={hitter.image}
								className={styles.hitter__rank_image}
							/>
						</td>
						<td>{hitter.team.teamname}</td>
						<td>{hitter.name}</td>
						<td>{(hitter.avg / 1000).toFixed(3)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
