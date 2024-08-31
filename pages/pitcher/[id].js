import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/pitcher.module.css";

export async function getServerSideProps(context) {
	const id = context.params["id"];

	let pitcher;
	try {
		const res = await axios.get(`/pitcher/${id}`);
		pitcher = res.data;
	} catch {
		return {
			notFound: true,
		};
	}

	const { data: max } = await axios.get("/maxData");

	return {
		props: {
			pitcher,
			max,
		},
	};
}

export default function PitcherDetail({ pitcher, max }) {
	const data = [
		pitcher.era.toFixed(2),
		pitcher.whip.toFixed(2),
		pitcher.win,
		pitcher.inning,
	];
	const maxValues = [0.333, 1, max.maxWin, max.maxInning];

	const option = {
		title: {
			text: pitcher.name,
		},
		legend: {
			show: true,
			data: [pitcher.name],
		},
		tooltip: {
			trigger: "item",
			formatter: `${pitcher.name}<br>ERA: ${pitcher.era}<br>WHIP: ${pitcher.whip}<br>승리: ${pitcher.win}<br>이닝: ${pitcher.inning}`,
		},
		radar: {
			indicator: [
				{ name: "ERA", max: 0.333, min: 0.125 },
				{ name: "WHIP", max: 1, min: 0.4 },
				{ name: "승리", max: max.maxWin },
				{ name: "이닝", max: max.maxInning },
			],
		},
		series: [
			{
				name: pitcher.name,
				type: "radar",
				data: [
					{
						value: data.map((value, index) => {
							if (index == 0 || index == 1) {
								return Math.min(1 / value, maxValues[index]);
							} else {
								return Math.min(value, maxValues[index]);
							}
						}),

						name: pitcher.name,
					},
				],
			},
		],
	};

	return (
		<div className={styles.pitcher}>
			<Head>
				<title>{pitcher.name}</title>
			</Head>

			<div className={styles.pitcher__info}>
				<img
					src={pitcher.image}
					style={{ width: "100px", height: "125px" }}
					alt="pitcher Image"
				/>

				<div className={styles.pitcher__info_text}>
					<h1>{pitcher.name}</h1>

					<p>{pitcher.team.teamnameEn}</p>

					<p>
						키/몸무게: {pitcher.height}cm/{pitcher.weight}kg
					</p>
				</div>

				<div>
					<p>ERA: {pitcher.era.toFixed(2)}</p>
					<p>WHIP: {pitcher.whip.toFixed(2)}</p>
					<p>
						승/패: {pitcher.win}/{pitcher.lose}
					</p>
					<p>
						세/홀: {pitcher.save}/{pitcher.hold}
					</p>
					<p>이닝: {pitcher.inning}</p>
				</div>
			</div>

			<ReactEcharts option={option} />
		</div>
	);
}
