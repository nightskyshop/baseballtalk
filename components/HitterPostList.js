import styles from "./HitterPostList.module.css";

export default function HitterPostList({
	hitterRanking,
	currentIndex,
	addHitter,
}) {
	return (
		<table className={styles.hitter__post_table}>
			<caption className={styles.hitter__post_caption}>타자</caption>

			<thead className={styles.hitter__post_thead}>
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
					<th scope="col"></th>
				</tr>
			</thead>

			<tbody className={styles.hitter__post_tbody}>
				{hitterRanking.map((hitter, index) => (
					<tr key={index}>
						<th scope="row">{currentIndex * 10 + index + 1}.</th>
						<td>
							<img
								width={40}
								height={52}
								src={hitter.image}
								className={styles.hitter__post_image}
							/>
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
						<td>
							<button
								className={styles.hitter__post_btn}
								onClick={() => addHitter(hitter)}
							>
								추가
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
