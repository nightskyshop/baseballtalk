import {
	faCaretDown,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styles from "./PostForm.module.css";
import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import uuid from "react-uuid";
import { useEffect, useState } from "react";
import HitterRankList from "./HitterRankList";
import Pagination from "./Pagination";
import PitcherRankList from "./PitcherRankList";
import HitterPostList from "./HitterPostList";
import PitcherPostList from "./PitcherPostList";

export default function PostForm() {
	const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;
	const router = useRouter();
	const params = useSearchParams();

	const [teams, setTeams] = useState([]);
	const [hitterData, setHitterData] = useState([]);
	const [hitterTotalPages, setHitterTotalPages] = useState();
	const [pitcherData, setPitcherData] = useState([]);
	const [pitcherTotalPages, setPitcherTotalPages] = useState();

	const [hitterPageNo, setHitterPageNo] = useState(0);
	const [pitcherPageNo, setPitcherPageNo] = useState(0);

	const [displayHitter, setDisplayHitter] = useState([]);
	const [displayPitcher, setDisplayPitcher] = useState([]);

	const [q, setQ] = useState();

	const update = params.get("update");
	const id = params.get("id");
	const default_team = params.get("team");
	const default_category = params.get("category");
	const default_title = params.get("title");
	const default_content = params.get("content");

	const getTeams = async () => {
		const t = await axios.get(`/team`);
		setTeams(t.data);
	};

	const createPost = async (title, content, team, category, author) => {
		if (!update) {
			await axios
				.post(
					"/post",
					{
						title,
						content,
						team,
						category,
						author,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				)
				.then((res) => {
					res.status == 201
						? router.push(`/team/${team}`)
						: window.alert("문제가 생겼습니다. 잠시후 시도해주세요.");
				});
		} else {
			await axios
				.patch(
					`/post/${id}`,
					{
						title,
						content,
						team,
						category,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				)
				.then((res) => {
					res.status == 200
						? router.push(`/post/${id}`)
						: window.alert("문제가 생겼습니다. 잠시후 시도해주세요.");
				});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const title = form.elements.namedItem("title").value;
		const content = form.elements.namedItem("content").value;
		const team = form.elements.namedItem("team").value;
		const category = form.elements.namedItem("category").value;

		if (
			title.trim() == "" ||
			content.trim() == "" ||
			team == "" ||
			category == ""
		) {
			window.alert("모든 항목을 입력해주세요.");
		} else {
			await createPost(title, content, team, category, user.data.id);
		}
	};

	const getSearch = async (input) => {
		const {
			data: { content: hitterDataSearch, totalPages: hitterTotalPagesSearch },
		} = await axios.get(`/hitter/search?searchParam=${input}&pageNo=0`);
		setHitterData(hitterDataSearch);
		setHitterTotalPages(hitterTotalPagesSearch);

		const {
			data: { content: pitcherDataSearch, totalPages: pitcherTotalPagesSearch },
		} = await axios.get(`/pitcher/search?searchParam=${input}&pageNo=0`);
		setPitcherData(pitcherDataSearch);
		setPitcherTotalPages(pitcherTotalPagesSearch);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const input = form.elements.namedItem("input").value;

		setQ(input);

		await getSearch(input);
	};

	const getNextHitter = async () => {
		const {
			data: { content: data },
		} = await axios.get(
			`/hitter/search?pageNo=${hitterPageNo}&searchParam=${q}`
		);

		setHitterData(data);
	};

	const getNextPitcher = async () => {
		const {
			data: { content: data },
		} = await axios.get(
			`/pitcher/search?pageNo=${pitcherPageNo}&searchParam=${q}`
		);

		setPitcherData(data);
	};

	const handleHitterPageChange = ({ selected }) => {
		setHitterPageNo(selected);
	};

	const handlePitcherPageChange = ({ selected }) => {
		setPitcherPageNo(selected);
	};

	useEffect(() => {
		getTeams();
	}, []);

	useEffect(() => {
		getNextHitter();
	}, [hitterPageNo, q]);

	useEffect(() => {
		getNextPitcher();
	}, [pitcherPageNo, q]);

	const addHitter = (hitter) => {
		if (
			!displayHitter.includes(hitter) &&
			displayHitter.length + displayPitcher.length <= 4
		) {
			setDisplayHitter((prevDisplayHitter) => [...prevDisplayHitter, hitter]);
		}
	};

	const addPitcher = (pitcher) => {
		if (
			!displayPitcher.includes(pitcher) &&
			displayHitter.length + displayPitcher.length <= 4
		) {
			setDisplayPitcher((prevDisplayPitcher) => [
				...prevDisplayPitcher,
				pitcher,
			]);
		}
	};

	console.log(displayHitter);
	console.log(displayPitcher);
	console.log(displayHitter.length + displayPitcher.length);

	return (
		<>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.form__header}>
					<h1>게시판 글쓰기</h1>
					<button>등록</button>
				</div>

				<div className={styles.form__team}>
					<div className={styles.form__selects}>
						<div className={styles.form__select}>
							<select
								name="team"
								key={uuid()}
								defaultValue={default_team ? default_team : ""}
							>
								<option value="">팀를 선택해주세요.</option>
								{/* <option value={1}>LG Twins</option>
              <option value={2}>KT Wiz</option>
              <option value={3}>SSG Landers</option>
              <option value={4}>NC Dinos</option>
              <option value={5}>Doosan Bears</option>
              <option value={6}>KIA Tigers</option>
              <option value={7}>Lotte Giants</option>
              <option value={8}>Samsung Lions</option>
              <option value={9}>Hanwha Eagles</option>
              <option value={10}>Kiwoom Heros</option> */}
								{teams.map((team) => (
									<option key={team.id} value={team.id}>
										{team.teamnameEn}
									</option>
								))}
								<option value={11}>관련 없음</option>
							</select>
							<FontAwesomeIcon
								icon={faCaretDown}
								className={styles.form__select_btn}
							/>
						</div>

						<div className={styles.form__select}>
							<select
								name="category"
								key={uuid()}
								defaultValue={default_category ? default_category : ""}
							>
								<option value="">주제를 선택해주세요.</option>
								<option value="팀/선수">팀/선수</option>
								<option value="경기">경기</option>
								<option value="플레이">플레이</option>
								<option value="국제대회">국제대회</option>
								<option value="기타">기타</option>
							</select>

							<FontAwesomeIcon
								icon={faCaretDown}
								className={styles.form__select_btn}
							/>
						</div>
					</div>

					<input
						type="text"
						placeholder="제목을 입력해 주세요."
						name="title"
						className={styles.form__title}
						defaultValue={default_title ? default_title : ""}
					/>
				</div>

				<div className={styles.form__content_box}>
					<textarea
						type="text"
						placeholder="내용을 입력해 주세요."
						name="content"
						className={styles.form__content}
						defaultValue={default_content ? default_content : ""}
					/>
				</div>
			</form>

			<div className={styles.displayPlayer}>
				{displayHitter.map((hitter) => (
					<div key={hitter.id}>{hitter.name}</div>
				))}

				{displayPitcher.map((pitcher) => (
					<div key={pitcher.id}>{pitcher.name}</div>
				))}
			</div>

			<form onSubmit={handleSearch} className={styles.searchForm}>
				<input
					className={styles.searchForm__input}
					type="text"
					name="input"
					placeholder="선수를 검색해주세요"
				/>

				<button>
					<FontAwesomeIcon
						className={styles.searchForm__icon}
						icon={faMagnifyingGlass}
					/>
				</button>
			</form>

			<div className={styles.ranking}>
				{hitterData ? (
					hitterData.length >= 1 ? (
						<>
							<HitterPostList
								hitterRanking={hitterData}
								currentIndex={hitterPageNo}
								addHitter={addHitter}
							/>

							<Pagination
								pageCount={hitterTotalPages}
								onPageChange={handleHitterPageChange}
								currentPage={hitterPageNo}
							/>
						</>
					) : null
				) : null}

				{pitcherData ? (
					pitcherData.length >= 1 ? (
						<>
							<PitcherPostList
								pitcherRanking={pitcherData}
								currentIndex={pitcherPageNo}
								addPitcher={addPitcher}
							/>

							<Pagination
								pageCount={pitcherTotalPages}
								onPageChange={handlePitcherPageChange}
								currentPage={pitcherPageNo}
							/>
						</>
					) : null
				) : null}
			</div>
		</>
	);
}
