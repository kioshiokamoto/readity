import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr'

import PostCard from '../components/PostCard';
import { Post } from '../types';




dayjs.extend(relativeTime);


export default function Home() {
	const {data:posts} = useSWR('/posts')
	return (
		<Fragment>
			<Head>
				<title>Readity: the front page of the internet</title>
			</Head>
			<div className="container flex pt-4">
				{/* Post feed */}
				<div className="w-160">
					{ posts?.map((post) => (
						<PostCard key={post.identifier} post={post} />
					))}
				</div>
				{/* side bar */}
			</div>
		</Fragment>
	);
}
