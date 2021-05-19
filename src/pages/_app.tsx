import { Header } from '../components/Header/index';
import {BooksContextProvider} from '../contexts/BooksContext'; 
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <BooksContextProvider>
      <Header />  
      <Component {...pageProps} />
    </BooksContextProvider>
  );
}

export default MyApp
