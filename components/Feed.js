import { useQuery } from "@tanstack/react-query";
import getUser from "@/lib/getUser";
import RandomFeed from "./RandomFeed";

export default function Feed() {
	const {
		data: user,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getUser,
	});

	return (
		<div>
			<RandomFeed />
		</div>
	);
}
