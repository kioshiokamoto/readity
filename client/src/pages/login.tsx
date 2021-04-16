import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import InputGroup from '../components/InputGroup';
export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<any>({});

	const router = useRouter();

	const submitForm = async (event: FormEvent) => {
		event.preventDefault();

		try {
			const res = await axios.post(
				'/auth/login',
				{
					username,
					password,
				}
			);
			router.push('/');
		} catch (errors) {
			setErrors(errors.response.data);
		}
	};
	return (
		<div className="flex bg-white">
			<Head>
				<title>Login</title>
			</Head>

			<div
				className="h-screen bg-center bg-cover w-36"
				style={{ backgroundImage: "url('/images/bricks.jpg')" }}
			></div>
			<div className="flex flex-col justify-center pl-6">
				<div className="w-70">
					<h1 className="mb-2 text-lg font-medium">Log in</h1>
					<p className="mb-10 text-xs ">
						By continuing, you agree to our User Agreement and Privacy Policy.{' '}
					</p>
					<form onSubmit={submitForm}>
						<InputGroup
							className="mb-2"
							placeholder="Username"
							type="text"
							value={username}
							setValue={setUsername}
							error={errors.username}
						/>
						<InputGroup
							className="mb-4"
							placeholder="Password"
							type="password"
							value={password}
							setValue={setPassword}
							error={errors.password}
						/>
						<button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
							Login
						</button>
					</form>
					<small>
						New to redadity?
						<Link href="/register">
							<a className="ml-1 text-blue-500 uppercase">Sign up</a>
						</Link>
					</small>
				</div>
			</div>
		</div>
	);
}
