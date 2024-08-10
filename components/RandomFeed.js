import { useEffect, useState } from "react";
import styles from "./RandomFeed.module.css";
import axios from "axios";

export default function RandomFeed() {
	const [teams, setTeams] = useState();
	const [hitter, setHitter] = useState();
	const [pitcher, setPitcher] = useState();

	const getTeams = async () => {};

	const getRandomHitter = async () => {
		const { data } = await axios.get(`/hitter/random`);

		setHitter(data);
	};

	const getRandomPitcher = async () => {
		const { data } = await axios.get(`/pitcher/random`);

		setPitcher(data);
	};

	useEffect(() => {
		getTeams();
		getRandomHitter();
		getRandomPitcher();
	}, []);

	return (
		<div>
			<h1>랜덤 피드</h1>

			<div className={styles.randomfeed__grid}>
				<div className={`${styles.randomfeed__card} ${styles.all__team}`}>
					전체 팀
				</div>

				<div className={`${styles.randomfeed__card} ${styles.random__hitter}`}>
					{hitter ? (
						<>
							<h2>{hitter.name}</h2>

							<div className={styles.randomfeed__card_box}>
								<img
									src={hitter.image}
									styles={{ height: "120px" }}
									alt="Hitter Image"
									priority
								/>

								<div className={styles.randomfeed__card_text}>
									<p>{hitter.game}게임</p>
									<p>타율: {(hitter.avg / 1000).toFixed(3)}</p>
									<p>OPS: {(hitter.ops / 1000).toFixed(3)}</p>
									<p>홈런: {hitter.homeRun}개</p>
									<p>도루: {hitter.stolenBase}개</p>
								</div>
							</div>
						</>
					) : (
						<p>로딩중...</p>
					)}
				</div>

				<div className={`${styles.randomfeed__card} ${styles.random__pitcher}`}>
					{pitcher ? (
						<>
							<h2>{pitcher.name}</h2>

							<div className={styles.randomfeed__card_box}>
								<img
									src={pitcher.image}
									styles={{ height: "120px" }}
									alt="Pitcher Image"
									priority
								/>

								<div className={styles.randomfeed__card_text}>
									<p>{pitcher.inning}이닝</p>
									<p>ERA: {pitcher.era.toFixed(2)}</p>
									<p>
										승-패: {pitcher.win}-{pitcher.lose}
									</p>
									<p>
										홀-세: {pitcher.hold}-{pitcher.save}
									</p>
									<p>WHIP: {pitcher.whip.toFixed(2)}</p>
								</div>
							</div>
						</>
					) : (
						<p>로딩중...</p>
					)}
				</div>

				<div className={`${styles.randomfeed__card} ${styles.random__team}`}>
					랜덤 팀
				</div>
			</div>
		</div>
	);
}
