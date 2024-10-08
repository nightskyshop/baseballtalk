import axios from "axios";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";

export default function HitterChart({ hitter }) {
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

	return <ReactEcharts option={option} />;
}
