import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import useSWR, { useSWRInfinite } from 'swr';
import PostCard from '../components/PostCard';
import { useAuthState } from '../context/auth';
import { Post, Sub } from '../types';

dayjs.extend(relativeTime);

export default function Home() {
	const [observedPost, setObservedPost] = useState('');

	const { data: topSubs } = useSWR<Sub[]>('/misc/top-subs');

	const { authenticated } = useAuthState();

	const { data, error, size: page, setSize: setPage, isValidating, revalidate } = useSWRInfinite(
		(index) => `/posts?page=${index}`,
		{
			revalidateAll: true,
		}
	);
	console.log(data)
	// TODO: ANALIZAR CON DETENIMIENTO!
	const posts: Post[] = data ? [].concat(...data) : [];
	//const isInitialLoading = !data && !error;

	const observeElement = (element: HTMLElement) => {
		if (!element) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting === true) {
					setPage(page + 1);
					observer.unobserve(element);
				}
			},
			{ threshold: 1 }
		);
		observer.observe(element);
	};

	useEffect(() => {
		if (!posts || posts.length === 0) {
			return;
		}

		const id = posts[posts.length - 1].identifier;
		if (id !== observedPost) {
			setObservedPost(id);
			observeElement(document.getElementById(id));
		}
	}, [posts]);

	return (
		<Fragment>
			<Head>
				<title>Readity: the front page of the internet</title>
			</Head>
			<div className="container flex pt-4">
				{/* Post feed */}
				<div className="w-full px-2 md:w-160 md:px-0">
					{isValidating && <p className="text-lg text-center">Loading</p>}
					{posts && posts?.map((post) => (
						<PostCard key={post.identifier} post={post} revalidate={revalidate} />
					))} 
					{isValidating &&  posts.length > 0 && <p className="text-lg text-center">Loading more...</p>}
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
									<a className="w-full px-2 py-1 blue button">Create Community</a>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
}
