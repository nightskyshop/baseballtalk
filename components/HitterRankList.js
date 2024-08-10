import Link from "next/link";
import styles from "./HitterRankList.module.css";

export default function HitterRankList({ hitterRanking, currentIndex }) {
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
					<th scope="col">장타율</th>
					<th scope="col">출루율</th>
					<th scope="col">OPS</th>
					<th scope="col">안타</th>
					<th scope="col">타점</th>
					<th scope="col">홈런</th>
					<th scope="col">도루</th>
				</tr>
			</thead>

			<tbody className={styles.hitter__rank_tbody}>
				{hitterRanking.map((hitter, index) => (
					<tr key={index}>
						<th scope="row">{currentIndex * 10 + index + 1}.</th>
						<td>
							<Link href={`/hitter/${hitter.id}`}>
								<img
									width={40}
									height={52}
									src={hitter.image}
									className={styles.hitter__rank_image}
								/>
							</Link>
						</td>
						<td>{hitter.team.teamname}</td>
						<td>{hitter.name}</td>
						<td>{(hitter.avg / 1000).toFixed(3)}</td>
						<td>{(hitter.slg / 1000).toFixed(3)}</td>
						<td>{(hitter.obp / 1000).toFixed(3)}</td>
						<td>{(hitter.ops / 1000).toFixed(3)}</td>
						<td>{hitter.hit}</td>
						<td>{hitter.rbi}</td>
						<td>{hitter.homeRun}</td>
						<td>{hitter.stolenBase}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
