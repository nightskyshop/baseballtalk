import Head from "next/head";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	BarElement,
	BarController,
} from "chart.js";
import { Chart, Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	BarController,
	Title,
	Tooltip,
	Legend
);

const data = {
	labels: ["2020 시즌", "2021 시즌", "2022 시즌", "2023 시즌"],
	datasets: [
		{
			type: "line",
			borderColor: "#898121",
			borderWidth: 2,
			data: [142, 132, 165, 138],
		},
		{
			type: "bar",
			backgroundColor: "#134074CC",
			data: [142, 132, 165, 138],
		},
	],
};

const options = {
	plugins: {
		legend: {
			display: false,
		},
	},
};

export default function DataReferance() {
	return (
		<div>
			<Head>
				<title>DataReferance</title>
			</Head>

			<h1>DataReferance</h1>

			<div style={{ width: "450px", marginTop: "1em" }}>
				<h3>박해민 통산 안타</h3>
				<Line type="line" data={data} options={options} />
			</div>
		</div>
	);
}
