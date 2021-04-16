import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Post } from '../types';

dayjs.extend(relativeTime);

export default function Home() {
	const [posts, setPosts] = useState<Post[]>([]);
	useEffect(() => {
		axios
			.get('/posts')
			.then((res) => setPosts(res.data))
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className="pt-12">
			<Head>
				<title>Readity: the front page of the internet</title>
			</Head>
			<div className="container flex pt-4">
				{/* Post feed */}
				<div className="w-160">
					{posts.map((post) => (
						<div key={post.identifier} className="flex mb-4 bg-white rounded">
							{/* VOTE SECTION */}
							<div className="w-10 text-center bg-gray-200 rounded-l">
								<p>V</p>
							</div>
							{/* Post data section */}
							<div className="w-full p2">
								<div className="flex items-center">
									<Link href={`/r/${post.subName}`}>
										<div className="flex items-center">
											{/* Doesn work with Fragment */}
											<img
												src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
												className="w-6 h-6 mr-1 rounded-full cursor-pointer"
											/>
											<a className="text-xs font-bold cursor-pointer hover:underline">
												/r/${post.subName}
											</a>
										</div>
									</Link>
									<p className="text-xs text-gray-500">
										<span className="mx-1">•</span> Posted by
										<Link href={`/u/${post.username}`}>
											<a className="mx-1 hover:underline">/u/{post.username}</a>
										</Link>
										<Link href={post.url}>
											<a className="mx-1 hover:underline">{dayjs(post.createdAt).fromNow()}</a>
										</Link>
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
				{/* side bar */}
			</div>
		</div>
	);
}
