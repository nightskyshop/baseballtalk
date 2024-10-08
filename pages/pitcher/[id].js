import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/pitcher.module.css";
import PitcherChart from "@/components/PitcherChart";

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

	return {
		props: {
			pitcher,
		},
	};
}

export default function PitcherDetail({ pitcher }) {
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

			{/* <ReactEcharts option={option} /> */}
			<PitcherChart pitcher={pitcher} />
		</div>
	);
}
