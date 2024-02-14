import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/lib/axiosSetting";
import default_styles from "@/styles/default.module.css";
import "@/styles/global.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />

      <main className={default_styles.main}>
        <div className={default_styles.main__box}>
          <Component {...pageProps} />
        </div>
      </main>
    </QueryClientProvider>
  );
}
