import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
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
						<PostCard key={post.identifier} post={post} />
					))}
				</div>
				{/* side bar */}
			</div>
		</div>
	);
}
