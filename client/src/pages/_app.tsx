import axios from 'axios';
import Axios from 'axios';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';

import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/auth';

import '../styles/globals.css';
import '../styles/icons.css';

Axios.defaults.baseURL = `http://localhost:5000/api`;
Axios.defaults.withCredentials = true;

const fetcher = async(url)=> {
	try {
		const res = await axios.get(url)
		return res.data
	} catch (error) {
		throw error.response.data
	}
}


function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	const authRoutes = ['/login', '/register'];
	const authRoute = authRoutes.includes(pathname);

	return (
		<SWRConfig
			value={{
				fetcher: fetcher,
				dedupingInterval:10000
			}}
		>
			<AuthProvider>
				{!authRoute && <Navbar />}
				<div className={authRoute ? '' :'pt-12'}>
				<Component {...pageProps} />

				</div>
			</AuthProvider>
		</SWRConfig>
	);
}

export default App;
