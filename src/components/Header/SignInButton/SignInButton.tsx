import React from 'react';
import style from './style.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

const SignInButton = () => {
	const isUserLoggedIn = true;
	if (isUserLoggedIn) {
		return (
			<button type='button' className={style.button}>
				<FaGithub color='#04b361' />
				<span>João Pedro Matias</span>
				<FiX color='04b361'></FiX>
			</button>
		);
	}

	return (
		<button type='button' className={style.button}>
			<FaGithub color='#eba417' />
			<span>Sign In with Github</span>
		</button>
	);
};

export default SignInButton;
