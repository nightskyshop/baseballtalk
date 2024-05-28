import { useState } from "react";
import styles from "./Rank.module.css";
import TeamRank from "./TeamRank";
import HitterRank from "./HitterRank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PitcherRank from "./PitcherRank";

export default function Rank({ teamRanking, hitterRanking, pitcherRanking }) {
	const [index, setIndex] = useState(1);

	const showNextSlider = (e) => {
		setIndex((prevIndex) => {
			if (prevIndex == 3) return 1;
			else return prevIndex + 1;
		});
	};

	const showPrevSlider = (e) => {
		setIndex((prevIndex) => {
			if (prevIndex == 1) return 3;
			else return prevIndex - 1;
		});
	};

	return (
		<div className={styles.rank}>
			{index == 1 ? <TeamRank teamRanking={teamRanking} /> : null}

			{index == 2 ? <HitterRank hitterRanking={hitterRanking} /> : null}

			{index == 3 ? <PitcherRank pitcherRanking={pitcherRanking} /> : null}

			<button
				onClick={showPrevSlider}
				className={`${styles.slider__btn} ${styles.left}`}
			>
				<FiChevronLeft />
			</button>
			<button
				onClick={showNextSlider}
				className={`${styles.slider__btn} ${styles.right}`}
			>
				<FiChevronRight />
			</button>
		</div>
	);
}
