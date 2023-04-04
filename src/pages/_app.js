import '../styles/globals.scss'
import axios from 'axios';


axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
