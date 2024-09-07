import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./TeamFeed.module.css";
import Image from "next/image";
import Link from "next/link";

export default function TeamFeed({ teamId }) {
	const [team, setTeam] = useState();
	const [hitter, setHitter] = useState();
	const [pitcher, setPitcher] = useState();

	const getTeam = async () => {
		const { data } = await axios.get(`/team/${teamId}`);

		setTeam(data);
	};

	const getRandomHitter = async () => {
		const { data } = await axios.get(`/hitter/random/${teamId}`);

		setHitter(data);
	};

	const getRandomPitcher = async () => {
		const { data } = await axios.get(`/pitcher/random/${teamId}`);

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
			<div className={styles.teamfeed__grid}>
				<div className={styles.teamfeed__card}>
					{team ? (
						<>
							<h2>{team.teamnameEn}</h2>

							<div className={styles.teamfeed__card_box}>
								<Image
									src={`/images/${team.teamname}.png`}
									width={98}
									height={98}
									alt="Team Image"
									priority
								/>

								<div className={styles.teamfeed__card_text}>
									<h3>정규시즌 {team.ranknum}위</h3>
									<p>
										{team.win}승 {team.tie}무 {team.lose}패
									</p>
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

				{hitter ? (
					<Link href={`/hitter/${hitter.id}`} className={styles.teamfeed__card}>
						<h2>{hitter.name}</h2>

						<div className={styles.teamfeed__card_box}>
							<img
								src={hitter.image}
								styles={{ height: "100px" }}
								alt="Hitter Image"
								priority
							/>

							<div className={styles.teamfeed__card_text}>
								<p>{hitter.game}게임</p>
								<p>타율: {(hitter.avg / 1000).toFixed(3)}</p>
								<p>OPS: {(hitter.ops / 1000).toFixed(3)}</p>
								<p>홈런: {hitter.homeRun}개</p>
								<p>도루: {hitter.stolenBase}개</p>
							</div>
						</div>
					</Link>
				) : (
					<p>로딩중...</p>
				)}

				{pitcher ? (
					<Link
						href={`/pitcher/${pitcher.id}`}
						className={styles.teamfeed__card}
					>
						<h2>{pitcher.name}</h2>

						<div className={styles.teamfeed__card_box}>
							<img
								src={pitcher.image}
								styles={{ height: "100px" }}
								alt="Pitcher Image"
								priority
							/>

							<div className={styles.teamfeed__card_text}>
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
					</Link>
				) : (
					<p>로딩중...</p>
				)}
			</div>
		</div>
	);
}
