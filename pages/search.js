import SearchForm from "@/components/SearchForm";
import { useSearchParams } from "next/navigation";

export default function Search() {
	const params = useSearchParams();

	const q = params.get("q");
	console.log(q);

	return (
		<div>
			<SearchForm defaultValue={q} />

			<div>
				hitter LIst hitter LIsthitter LIst hitter LIst hitter LIst hitter LIst
			</div>

			<div>
				pitcher LIst pitcher LIst pitcher LIst pitcher LIst pitcher LIst
			</div>
		</div>
	);
}
