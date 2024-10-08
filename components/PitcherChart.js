import axios from "axios";
import { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";

export default function PitcherChart({ pitcher }) {
	const [max, setMax] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchMaxData = async () => {
			try {
				const { data } = await axios.get("/maxData");
				setMax(data);
				setLoading(false);
			} catch (err) {
				setError("Max Data를 가져오는 것을 실패하였습니다.");
				setLoading(false);
			}
		};

		fetchMaxData();
	}, []);

	if (loading) return <div>로딩중...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!max) return null;

	const maxValues = [0.333, 1, max.maxWin, max.maxInning];

	const data = [
		pitcher.era.toFixed(2),
		pitcher.whip.toFixed(2),
		pitcher.win,
		pitcher.inning,
	];

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

	if (!option) return <div>로딩중...</div>;

	return <ReactEcharts option={option} />;
}
