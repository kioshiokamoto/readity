import Axios from 'axios';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/auth';
import '../styles/globals.css';
import '../styles/icons.css';







Axios.defaults.baseURL = `http://localhost:5000/api`;
Axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	const authRoutes = ['/login', '/register'];
	const authRoute = authRoutes.includes(pathname);

	return (
		<AuthProvider>
			{!authRoute && <Navbar />}
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default App;
