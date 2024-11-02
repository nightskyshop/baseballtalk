import Image from "next/image";
import styles from "./PitcherRank.module.css";
import Link from "next/link";

export default function PitcherRank({ pitcherRanking }) {
	return (
		<table className={styles.pitcher__rank_table}>
			<caption className={styles.pitcher__rank_caption}>PITCHER RANK</caption>

			<thead className={styles.pitcher__rank_thead}>
				<tr>
					<th scope="col">순위</th>
					<th scope="col"></th>
					<th scope="col">팀</th>
					<th scope="col">이름</th>
					<th scope="col">평균자책점</th>
				</tr>
			</thead>

			<tbody className={styles.pitcher__rank_tbody}>
				{pitcherRanking.map((pitcher, index) => (
					<tr key={index}>
						<th scope="row">{index + 1}.</th>
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
						<td>{pitcher.era}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
