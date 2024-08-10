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

	return {
		props: {
			hitter,
		},
	};
}

export default function HitterDetail({ hitter }) {
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
		},
		radar: {
			indicator: [
				{ name: "타율", max: 0.365 },
				{ name: "장타율", max: 0.65, min: 0.3 },
				{ name: "홈런", max: 30 },
				{ name: "안타", max: 150 },
				{ name: "도루", max: 51 },
			],
		},
		series: [
			{
				name: hitter.name,
				type: "radar",
				data: [
					{
						value: [
							(hitter.avg / 1000).toFixed(3),
							(hitter.slg / 1000).toFixed(3),
							hitter.homeRun,
							hitter.hit,
							hitter.stolenBase,
						],
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
					<p>도루: {hitter.stolenBase}개</p>
				</div>
			</div>

			<ReactEcharts option={option} />
		</div>
	);
}
