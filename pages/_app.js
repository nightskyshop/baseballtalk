import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProjectProvider from "@/context/context";
import { prefix } from "../config/config";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import default_styles from "@/styles/default.module.css";
import "@/styles/global.css";
import "@/lib/axiosSetting";

config.autoAddCss = false;

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	return (
		<ProjectProvider value={{ prefix }}>
			<QueryClientProvider client={queryClient}>
				<Header />
				<main className={default_styles.main}>
					<div className={default_styles.main__box}>
						<Component {...pageProps} />
					</div>
				</main>
			</QueryClientProvider>
		</ProjectProvider>
	);
}
