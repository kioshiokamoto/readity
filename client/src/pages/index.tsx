import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import useSWR from 'swr';

import PostCard from '../components/PostCard';
import { useAuthState } from '../context/auth';
import { Post, Sub } from '../types';

dayjs.extend(relativeTime);

export default function Home() {
	const { data: posts } = useSWR<Post[]>('/posts');
	const { data: topSubs } = useSWR<Sub[]>('/misc/top-subs');

	const { authenticated } = useAuthState();

	return (
		<Fragment>
			<Head>
				<title>Readity: the front page of the internet</title>
			</Head>
			<div className="container flex pt-4">
				{/* Post feed */}
				<div className="w-full px-2 md:w-160 md:px-0">
					{posts?.map((post) => (
						<PostCard key={post.identifier} post={post} />
					))}
				</div>
				{/* side bar */}
				<div className="hidden px-4 ml-6 md:block w-80 md:px-0">
					<div className="bg-white rounded">
						<div className="p-4 border-b-2">
							<p className="text-lg font-semibold text-center">Top Communities</p>
						</div>
						<div>
							{topSubs?.map((sub) => (
								<div key={sub.name} className="flex items-center px-4 py-2 text-xs border-b">
									<Link href={`/r/${sub.name}`}>
										<a>
											<Image
												src={sub.imageUrl}
												className="rounded-full cursor-pointer"
												alt="Sub"
												width={(6 * 16) / 4}
												height={(6 * 16) / 4}
											/>
										</a>
									</Link>

									<Link href={`/r/${sub.name}`}>
										<a className="ml-2 font-bold hover:cursor-pointer">/r/{sub.name}</a>
									</Link>
									<p className="ml-auto font-medium">{sub.postcount}</p>
								</div>
							))}
						</div>
						{authenticated && (
						<div className="p-4 border-t-2">
							<Link href="subs/create">
								<a className="w-full px-2 py-1 blue button">
									Create Community
								</a>
							</Link>
						</div>
						
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
}
