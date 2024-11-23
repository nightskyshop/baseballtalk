import ChatForm from "./ChatForm.js";
import ChatList from "./ChatList.js";
import Reaction from "./Reaction.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import getUser from "@/lib/getUser.js";
import { useQuery } from "@tanstack/react-query";
import styles from "./Post.module.css";
import axios from "axios";
import ProfileImage from "./ProfileImage.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import PitcherChart from "./PitcherChart.js";
import HitterChart from "./HitterChart.js";

export default function Post({
	post,
	chats: default_chats = [],
	totalPages = 1,
}) {
	const router = useRouter();
	const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;

	const [chats, setChats] = useState(default_chats);
	const [pageNo, setPageNo] = useState(0);
	const [dropdown, setDropdown] = useState(false);

	const getChats = async () => {
		const { data: chats } = await axios.get(
			`/chat/post/${post.id}?pageNo=${pageNo}`
		);
		setChats(chats.content);
	};

	const createChat = async (content) => {
		await axios
			.post("/chat", {
				content,
				post: post.id,
				author: user.data.id,
			})
			.then((res) => {
				if (res.status == 201) {
					getChats();
				}
			});
	};

	const handleDropdownClick = (e) => {
		e.preventDefault();
		setDropdown((prevdropdown) => !prevdropdown);
	};

	const handleDropdownBlur = () => {
		setTimeout(() => {
			setDropdown(false);
		}, 500);
	};

	const handleDeleteClick = async (e) => {
		e.preventDefault();

		if (post) {
			await axios.delete(`/post/${post.id}`).then(() => router.push("/post"));
		}
	};

	const handlePageChange = ({ selected }) => {
		setPageNo(selected);
	};

	useEffect(() => {
		getChats();
	}, [pageNo]);

	return (
		<div className={styles.post}>
			<div className={styles.post__post}>
				<div className={styles.post__tc}>
					<Link href={`/team/${post.team.id}`} className={styles.post__team}>
						{post.team.teamnameEn}
					</Link>
					-<p className={styles.post__category}>{post.category}</p>
				</div>
				<h1 className={styles.post__title}>{post.title}</h1>
				<div className={styles.post__author}>
					<Link
						href={`/user/${post.author.id}`}
						className={styles.post__author_link}
					>
						<ProfileImage url={post.author.image} width={60} height={60} />
					</Link>

					<div className={styles.post__author_text}>
						<div className={styles.post__author_names}>
							<p className={styles.post__author_username}>
								{post.author.username}
							</p>
							<p className={styles.post__author_team}> - {post.author.team}</p>
						</div>
						<p className={styles.post__created}>
							{post.createdAt[0]}년 {post.createdAt[1]}월 {post.createdAt[2]}일{" "}
							{String(post.createdAt[3]).padStart(2, "0")}:
							{String(post.createdAt[4]).padStart(2, "0")}
						</p>
					</div>

					{user ? (
						user.data.id == post.author.id ? (
							<button onClick={handleDropdownClick} onBlur={handleDropdownBlur}>
								<FontAwesomeIcon icon={faEllipsisVertical} />
							</button>
						) : null
					) : null}

					<div
						className={`${styles.post__dropdown} ${
							dropdown ? styles.focus : ""
						}`}
					>
						<Link
							className={styles.dropdown__update}
							href={`/post/create?update=${true}&id=${post.id}&team=${
								post.team.id
							}&category=${post.category}&title=${post.title}&content=${
								post.content
							}`}
						>
							수정하기
						</Link>
						<button
							className={styles.dropdown__delete}
							onClick={handleDeleteClick}
						>
							삭제하기
						</button>
					</div>
				</div>
				<hr />

				{post.hitterList?.length >= 1 ? (
					<>
						<div className={styles.displayPlayer__hitter}>
							{post.hitterList.map((hitter) => (
								<div
									key={hitter.id}
									className={styles.displayPlayer__container}
								>
									<HitterChart hitter={hitter} />
								</div>
							))}
						</div>
					</>
				) : null}

				{post.picherList?.length >= 1 ? (
					<>
						<div className={styles.displayPlayer__pitcher}>
							{post.picherList.map((pitcher) => (
								<div
									key={pitcher.id}
									className={styles.displayPlayer__container}
								>
									<PitcherChart pitcher={pitcher} />
								</div>
							))}
						</div>
					</>
				) : null}

				<p className={styles.post__content}>{post.content}</p>
				<Reaction post={post} chat_count={chats.length} />
			</div>

			<hr />

			{chats ? (
				chats.length > 0 ? (
					<ChatList
						chats={chats}
						totalPages={totalPages}
						handlePageChange={handlePageChange}
						pageNo={pageNo}
					/>
				) : null
			) : null}

			{user ? <ChatForm user={user} createChat={createChat} /> : null}
		</div>
	);
}
