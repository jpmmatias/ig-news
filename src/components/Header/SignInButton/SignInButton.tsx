import React from 'react';
import style from './style.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, useSession, signOut } from 'next-auth/react';

const SignInButton = () => {
	const { data: session } = useSession();

	if (session) {
		return (
			<button type='button' className={style.button}>
				<FaGithub color='#04b361' />
				<span>{session.user.name}</span>
				<FiX onClick={() => signOut()} color='04b361'></FiX>
			</button>
		);
	}

	return (
		<button
			onClick={() => signIn('github')}
			type='button'
			className={style.button}>
			<FaGithub color='#eba417' />
			<span>Sign In with Github</span>
		</button>
	);
};

export default SignInButton;
