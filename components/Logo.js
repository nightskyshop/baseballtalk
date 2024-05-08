import Image from "next/image";

export default function Logo() {
	return (
		<Image src="/images/logo.png" width={80} height={60} alt="Logo Image" />
	);
}
