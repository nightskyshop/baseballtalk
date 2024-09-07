import Head from "next/head";
import TeamRank from "@/components/TeamRank";
import HitterRank from "@/components/HitterRank";
import PitcherRank from "@/components/PitcherRank";
import styles from "@/styles/data-referance.module.css";
import Rank from "@/components/Rank";
import axios from "axios";
import RankList from "@/components/RankList";
import Feed from "@/components/Feed";
import SearchForm from "@/components/SearchForm";
import RandomFeed from "@/components/RandomFeed";

export async function getServerSideProps() {
	const { data: teamRanking } = await axios.get(`/team`);
	const { data: hitterRanking } = await axios.get(
		`/hitter/avg?pageNo=0&pageSize=10`
	);
	const { data: pitcherRanking } = await axios.get(
		`/pitcher/era?pageNo=0&pageSize=10`
	);

	return {
		props: {
			teamRanking,
			hitterRanking,
			pitcherRanking,
		},
	};
}

export default function DataReferance({
	teamRanking,
	hitterRanking,
	pitcherRanking,
}) {
	return (
		<div>
			<Head>
				<title>데이터 자료실</title>
			</Head>

			<SearchForm />

			<RandomFeed />

			<RankList
				defaultHitterRanking={hitterRanking.content}
				hitterPage={hitterRanking.totalPages}
				defaultPitcherRanking={pitcherRanking.content}
				pitcherPage={pitcherRanking.totalPages}
			/>
		</div>
	);
}
