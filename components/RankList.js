import { useEffect, useState } from "react";
import HitterRankList from "./HitterRankList";
import PitcherRankList from "./PitcherRankList";
import Pagination from "./Pagination";
import styles from "./RankList.module.css";
import axios from "axios";

export default function RankList({
	defaultHitterRanking,
	hitterPage,
	defaultPitcherRanking,
	pitcherPage,
}) {
	const [index, setIndex] = useState(0);
	const [pageNo, setPageNo] = useState(0);
	const [hitterRanking, setHitterRanking] = useState(defaultHitterRanking);
	const [pitcherRanking, setPitcherRanking] = useState(defaultHitterRanking);

	const handleHitterClick = () => {
		setIndex(0);
		setPageNo(0);
	};

	const handlePitcherClick = () => {
		setIndex(1);
		setPageNo(0);
	};

	const handlePageChange = ({ selected }) => {
		setPageNo(selected);
	};

	const getNextHitter = async () => {
		const { data } = await axios.get(
			`/hitter/avg?pageNo=${pageNo}&pageSize=10`
		);

		setHitterRanking(data.content);
	};

	const getNextPitcher = async () => {
		const { data } = await axios.get(
			`/pitcher/era?pageNo=${pageNo}&pageSize=10`
		);

		setPitcherRanking(data.content);
	};

	useEffect(() => {
		if (index == 0) {
			getNextHitter();
		} else if (index == 1) {
			getNextPitcher();
		}
	}, [pageNo, index]);

	if (!hitterRanking || !pitcherRanking) return <div>로딩중...</div>;

	return (
		<div>
			<div className={styles.btns}>
				<button
					className={`${styles.hp_btn} ${
						index == 0 ? styles.hp_btn_selected : ""
					}`}
					onClick={handleHitterClick}
				>
					타자
				</button>
				<button
					className={`${styles.hp_btn} ${
						index == 1 ? styles.hp_btn_selected : ""
					}`}
					onClick={handlePitcherClick}
				>
					투수
				</button>
			</div>

			{index == 0 ? (
				<>
					<HitterRankList hitterRanking={hitterRanking} currentIndex={pageNo} />

					<Pagination
						pageCount={hitterPage}
						onPageChange={handlePageChange}
						currentPage={pageNo}
					/>
				</>
			) : null}

			{index == 1 ? (
				<>
					<PitcherRankList
						pitcherRanking={pitcherRanking}
						currentIndex={pageNo}
					/>

					<Pagination
						pageCount={pitcherPage}
						onPageChange={handlePageChange}
						currentPage={pageNo}
					/>
				</>
			) : null}
		</div>
	);
}
