import Header from "@/components/Header";
import default_styles from "@/styles/default.module.css";
import "@/styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      
      <main className={default_styles.main}>
        <div className={default_styles.main__box}>
          <Component {...pageProps} />
        </div>
      </main>
    </>
    
  )
}