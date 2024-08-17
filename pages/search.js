import HitterRankList from "@/components/HitterRankList";
import Pagination from "@/components/Pagination";
import PitcherRankList from "@/components/PitcherRankList";
import SearchForm from "@/components/SearchForm";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/search.module.css";

export async function getServerSideProps(context) {
	const { q } = context.query;

	const {
		data: { content: defaultHitters, totalPages: hittersTotalPages },
	} = await axios.get(`/hitter/search?pageNo=0&searchParam=${q}`);
	const {
		data: { content: defaultPitchers, totalPages: pitchersTotalPages },
	} = await axios.get(`/pitcher/search?pageNo=0&searchParam=${q}`);

	return {
		props: {
			defaultHitters,
			defaultPitchers,
			hittersTotalPages,
			pitchersTotalPages,
		},
	};
}

export default function Search({
	defaultHitters,
	defaultPitchers,
	hittersTotalPages,
	pitchersTotalPages,
}) {
	const searchParams = useSearchParams();

	const [hitters, setHitters] = useState(defaultHitters);
	const [pitchers, setPitchers] = useState(defaultPitchers);
	const [hitterPageNo, setHitterPageNo] = useState(0);
	const [pitcherPageNo, setPitcherPageNo] = useState(0);

	const q = searchParams.get("q");

	const getNextHitter = async () => {
		const {
			data: { content: data },
		} = await axios.get(
			`/hitter/search?pageNo=${hitterPageNo}&searchParam=${q}`
		);

		setHitters(data);
	};

	const getNextPitcher = async () => {
		const {
			data: { content: data },
		} = await axios.get(
			`/pitcher/search?pageNo=${pitcherPageNo}&searchParam=${q}`
		);

		setPitchers(data);
	};

	const handleHitterPageChange = ({ selected }) => {
		setHitterPageNo(selected);
	};

	const handlePitcherPageChange = ({ selected }) => {
		setPitcherPageNo(selected);
	};

	useEffect(() => {
		if (q) {
			getNextHitter();
		}
	}, [hitterPageNo, q]);

	useEffect(() => {
		if (q) {
			getNextPitcher();
		}
	}, [pitcherPageNo, q]);

	return (
		<div>
			<SearchForm defaultValue={q} />

			<div>
				{hittersTotalPages == 0 ? (
					<p className={styles.list__no_player}>해당 타자가 없어요...:(</p>
				) : (
					<>
						<HitterRankList
							hitterRanking={hitters}
							currentIndex={hitterPageNo}
						/>

						<Pagination
							pageCount={hittersTotalPages}
							onPageChange={handleHitterPageChange}
							currentPage={hitterPageNo}
						/>
					</>
				)}
			</div>

			<div>
				{pitchersTotalPages == 0 ? (
					<p className={styles.list__no_player}>해당 투수가 없어요...:(</p>
				) : (
					<>
						<PitcherRankList
							pitcherRanking={pitchers}
							currentIndex={pitcherPageNo}
						/>

						<Pagination
							pageCount={pitchersTotalPages}
							onPageChange={handlePitcherPageChange}
							currentPage={pitcherPageNo}
						/>
					</>
				)}
			</div>
		</div>
	);
}
