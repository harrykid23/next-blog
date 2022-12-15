import { GlobalState } from "../context/GlobalContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalState>
      <div className="w-full min-h-screen bg-slate-200 relative overflow-auto flex flex-col justify-start">
        <Component {...pageProps} />
        {/* <Footer/> */}
      </div>
    </GlobalState>
  );
}

export default MyApp;
