import Link from "next/link";
import styles from "./PitcherRankList.module.css";

export default function PitcherRankList({ pitcherRanking, currentIndex }) {
	return (
		<table className={styles.pitcher__rank_table}>
			<caption className={styles.pitcher__rank_caption}>투수</caption>

			<thead className={styles.pitcher__rank_thead}>
				<tr>
					<th scope="col">순위</th>
					<th scope="col"></th>
					<th scope="col">팀</th>
					<th scope="col">이름</th>
					<th scope="col">ERA</th>
					<th scope="col">이닝</th>
					<th scope="col">승</th>
					<th scope="col">패</th>
					<th scope="col">세이브</th>
					<th scope="col">홀드</th>
					<th scope="col">WHIP</th>
				</tr>
			</thead>

			<tbody className={styles.pitcher__rank_tbody}>
				{pitcherRanking.map((pitcher, index) => (
					<tr key={index}>
						<th scope="row">{currentIndex * 10 + index + 1}.</th>
						<td>
							<Link href={`/pitcher/${pitcher.id}`}>
								<img
									width={40}
									height={52}
									src={pitcher.image}
									className={styles.pitcher__rank_image}
								/>
							</Link>
						</td>
						<td>{pitcher.team.teamname}</td>
						<td>
							<Link href={`/pitcher/${pitcher.id}`}>{pitcher.name}</Link>
						</td>
						<td>{pitcher.era?.toFixed(2)}</td>
						<td>{pitcher.inning}</td>
						<td>{pitcher.win}</td>
						<td>{pitcher.lose}</td>
						<td>{pitcher.save}</td>
						<td>{pitcher.hold}</td>
						<td>{pitcher.whip?.toFixed(2)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
