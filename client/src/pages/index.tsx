import Head from 'next/head';

import RedditLogo from '../images/reddit.svg';
import Link from 'next/link';
export default function Home() {
	return (
		<div>
			<Head>
				<title>Readity: the front page of the internet</title>
			</Head>
			<div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 bg-white">
				{/* logo and title */}
				<div className="flex items-center">
					<Link href="/">
						<a>
							<RedditLogo className="w-8 h-8 mr-2" />
						</a>
					</Link>
					<span className="text-2xl font-semibold">
						<Link href="/">
							<a>Readity</a>
						</Link>
					</span>
				</div>
				{/* Search */}
				<div className="flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
					<i className="pl-4 pr-3 text-gray-500 fas fa-search"></i>
					<input type="text" className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none" />
				</div>
				{/* Auth */}
			</div>
		</div>
	);
}
