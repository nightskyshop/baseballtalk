import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./SettingForm.module.css";
import ProfileImage from "./ProfileImage";
import { useEffect, useState } from "react";
import FiletoBase64 from "@/lib/FiletoBase64";
import { useRouter } from "next/router";
import axios from "axios";

export default function SettingForm() {
	const user = useQuery({ queryKey: ["user"], queryFn: getUser }).data;
	const router = useRouter();
	const [profileImage, setProfileImage] = useState("");

	const handleUserInfoSubmit = async (e) => {
		e.preventDefault();

		const form = e.currentTarget;
		const username = form.elements.namedItem("username").value;
		const email = form.elements.namedItem("email").value;
		const introduce = form.elements.namedItem("introduce").value;
		const team = form.elements.namedItem("team").value;
		let image = form.elements.namedItem("image").value;

		if (!image.startsWith("http")) {
			image = profileImage;
		}

		if (user && localStorage.getItem("accessToken")) {
			await axios
				.patch(
					`/user/${user.data.id}`,
					{
						username,
						email,
						introduce,
						team,
						image,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				)
				.then((res) => {
					if (res.status == 200) {
						router.push("/user-profile");
					}
				});
		}
	};

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();

		const form = e.currentTarget;
		const oldPassword = form.elements.namedItem("old_password").value;
		const password = form.elements.namedItem("password").value;
		const passwordCheck = form.elements.namedItem("password_check").value;

		if (password != passwordCheck) {
			window.alert("비밀번호와 비밀번호 확인의 값이 다릅니다.");
		} else if (localStorage.getItem("accessToken")) {
			await axios
				.patch(
					"/user/password",
					{
						oldPassword,
						newPassword: password,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				)
				.then((res) => {
					if (res.status == 200) {
						router.push("/user-profile");
					}
				});
		}
	};

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		console.log(e.target.multiple);
		const base64Image = await FiletoBase64(file);
		setProfileImage(base64Image);
	};

	useEffect(() => {
		if (user) {
			setProfileImage(user.data.image);
		}
	}, [user]);

	return (
		<div className={styles.setting}>
			<form
				className={styles.setting__userInfo}
				onSubmit={handleUserInfoSubmit}
			>
				<h1 className={styles.userInfo__header}>기본정보</h1>

				<div className={styles.userInfo__name_img}>
					<div>
						<p>활동명</p>
						<input defaultValue={user.data.username} name="username" />
					</div>

					<div className={styles.userInfo__profileimg}>
						<ProfileImage url={profileImage} width={80} height={80} />
						<label htmlFor="image">
							<FontAwesomeIcon icon={faPen} />
						</label>

						<input
							name="image"
							id="image"
							onChange={handleImageChange}
							type="file"
							accept="image/*"
							multiple={false}
						/>
					</div>
				</div>

				<p>이메일 정보</p>
				<input
					defaultValue={user.data.email}
					className={styles.disabled__input}
					disabled
					name="email"
				/>

				<p>소개글</p>
				<input defaultValue={user.data.introduce} name="introduce" />

				<p>팀</p>
				<div className={styles.userInfo__team}>
					<select name="team" defaultValue={user.data.team}>
						<option value="">------</option>
						<option vlaue="LG Twins">LG Twins</option>
						<option vlaue="KT Wiz">KT Wiz</option>
						<option vlaue="SSG Landers">SSG Landers</option>
						<option vlaue="NC Dinos">NC Dinos</option>
						<option vlaue="Doosan Bears">Doosan Bears</option>
						<option vlaue="KIA Tigers">KIA Tigers</option>
						<option vlaue="Lotte Giants">Lotte Giants</option>
						<option vlaue="Samsung Lions">Samsung Lions</option>
						<option vlaue="Hanwha Eagles">Hanwha Eagles</option>
						<option vlaue="Kiwoom Heros">Kiwoom Heros</option>
					</select>
					<FontAwesomeIcon icon={faCaretDown} />
				</div>

				<button>저장</button>
			</form>

			<hr />

			<form
				className={styles.setting__password}
				onSubmit={handlePasswordSubmit}
			>
				<h1 className={styles.password__header}>비밀번호 변경</h1>

				<p className={styles.password__first_password}>기존 비밀번호</p>
				<input name="old_password" placeholder="········" type="password" />

				<p>새로운 비밀번호</p>
				<input name="password" placeholder="········" type="password" />

				<p>새로운 비밀번호 확인</p>
				<input name="password_check" placeholder="········" type="password" />

				<button>저장</button>
			</form>
		</div>
	);
}
