import { Header } from '../components/Header/index';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />  
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
