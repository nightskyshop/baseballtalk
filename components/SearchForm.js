import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SearchForm.module.css";
import { useRouter } from "next/router";

export default function SearchForm({ defaultValue = "" }) {
	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const input = form.elements.namedItem("input").value;

		router.push(`/search?q=${input}`);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.searchForm}>
			<input
				className={styles.searchForm__input}
				type="text"
				name="input"
				placeholder="선수를 검색해주세요"
				defaultValue={defaultValue}
			/>

			<button>
				<FontAwesomeIcon
					className={styles.searchForm__icon}
					icon={faMagnifyingGlass}
				/>
			</button>
		</form>
	);
}
