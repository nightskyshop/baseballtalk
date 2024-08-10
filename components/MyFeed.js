import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./MyFeed.module.css";
import Image from "next/image";

export default function MyFeed({ user }) {
	const [team, setTeam] = useState();
	const [hitter, setHitter] = useState();
	const [pitcher, setPitcher] = useState();

	const getTeam = async () => {
		const { data } = await axios.get(
			`/team/teamNameEn?team_eng_name=${user.data.team}`
		);

		setTeam(data);
	};

	const getRandomHitter = async () => {
		const { data } = await axios.get(`/hitter/random/${team.id}`);

		setHitter(data);
	};

	const getRandomPitcher = async () => {
		const { data } = await axios.get(`/pitcher/random/${team.id}`);

		setPitcher(data);
	};

	useEffect(() => {
		getTeam();
	}, []);

	useEffect(() => {
		if (team) {
			getRandomHitter();
			getRandomPitcher();
		}
	}, [team]);

	return (
		<div>
			<h1>{user.data.team} 데이터</h1>

			<div className={styles.myfeed__grid}>
				<div className={styles.myfeed__card}>
					{team ? (
						<>
							<h2>{team.teamnameEn}</h2>

							<div className={styles.myfeed__card_box}>
								<Image
									src={`/images/${team.teamname}.png`}
									width={120}
									height={120}
									alt="Team Image"
									priority
								/>

								<div className={styles.myfeed__card_text}>
									<h3>정규시즌 {team.ranknum}위</h3>
									<p>승률: {(team.winavg / 1000).toFixed(3)}</p>
									<p>타율: {(team.avg / 1000).toFixed(3)}</p>
									<p>ERA: {team.era?.toFixed(2)}</p>
								</div>
							</div>
						</>
					) : (
						<p>로딩중...</p>
					)}
				</div>

				<div className={styles.myfeed__card}>
					{hitter ? (
						<>
							<h2>{hitter.name}</h2>

							<div className={styles.myfeed__card_box}>
								<img
									src={hitter.image}
									styles={{ height: "120px" }}
									alt="Hitter Image"
									priority
								/>

								<div className={styles.myfeed__card_text}>
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

				<div className={styles.myfeed__card}>
					{pitcher ? (
						<>
							<h2>{pitcher.name}</h2>

							<div className={styles.myfeed__card_box}>
								<img
									src={pitcher.image}
									styles={{ height: "120px" }}
									alt="Pitcher Image"
									priority
								/>

								<div className={styles.myfeed__card_text}>
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
			</div>
		</div>
	);
}
