import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/hitter.module.css";

export async function getServerSideProps(context) {
	const id = context.params["id"];

	let hitter;
	try {
		const res = await axios.get(`/hitter/${id}`);
		hitter = res.data;
	} catch {
		return {
			notFound: true,
		};
	}

	const { data: max } = await axios.get("/maxData");

	return {
		props: {
			hitter,
			max,
		},
	};
}

export default function HitterDetail({ hitter, max }) {
	const data = [
		(hitter.avg / 1000).toFixed(3),
		hitter.rbi,
		hitter.homeRun,
		hitter.hit,
		hitter.stolenBase,
	];
	const maxValues = [
		0.34,
		max.maxRbi,
		max.maxHomerun,
		max.maxHit,
		max.maxStolenBase,
	];

	const option = {
		title: {
			text: hitter.name,
		},
		legend: {
			show: true,
			data: [hitter.name],
		},
		tooltip: {
			trigger: "item",
			formatter: `${hitter.name}<br>
			타율: ${(hitter.avg / 1000).toFixed(3)}<br>
			타점: ${hitter.rbi}<br>
			홈런: ${hitter.homeRun}<br>
			안타: ${hitter.hit}<br>
			도루: ${hitter.stolenBase}`,
		},
		radar: {
			indicator: [
				{ name: "타율", max: 0.34, min: 0.17 },
				{ name: "타점", max: max.maxRbi },
				{ name: "홈런", max: max.maxHomerun },
				{ name: "안타", max: max.maxHit },
				{ name: "도루", max: max.maxStolenBase },
			],
		},
		series: [
			{
				name: hitter.name,
				type: "radar",
				data: [
					{
						value: data.map((value, index) => {
							if (index == 0) {
								return Math.max(Math.min(value, maxValues[index]), 0.17);
							} else {
								return Math.min(value, maxValues[index]);
							}
						}),

						name: hitter.name,
					},
				],
			},
		],
	};

	return (
		<div className={styles.hitter}>
			<Head>
				<title>{hitter.name}</title>
			</Head>

			<div className={styles.hitter__info}>
				<img
					src={hitter.image}
					style={{ width: "100px", height: "125px" }}
					alt="Hitter Image"
				/>

				<div className={styles.hitter__info_text}>
					<h1>{hitter.name}</h1>

					<p>{hitter.team.teamnameEn}</p>

					<p>
						키/몸무게: {hitter.height}cm/{hitter.weight}kg
					</p>
				</div>

				<div>
					<p>타율: {(hitter.avg / 1000).toFixed(3)}</p>
					<p>장타율: {(hitter.slg / 1000).toFixed(3)}</p>
					<p>OPS: {(hitter.ops / 1000).toFixed(3)}</p>
					<p>홈런: {hitter.homeRun}개</p>
					<p>안타: {hitter.hit}개</p>
					<p>타점: {hitter.rbi}</p>
					<p>도루: {hitter.stolenBase}개</p>
				</div>
			</div>

			<ReactEcharts option={option} />
		</div>
	);
}
