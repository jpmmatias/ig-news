import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import SignInButton from './SignInButton';

jest.mock('next/router', () => {
	return {
		useRouter() {
			return { asPath: '/' };
		},
	};
});

jest.mock('next-auth/react');

describe('SignInButton Component', () => {
	describe('when user is authenticated', () => {
		const useSessionMocked = jest.mocked(useSession);

		useSessionMocked.mockReturnValueOnce({
			data: {
				user: { name: 'John Doe', email: 'john.doe@example.com' },
				expires: 'fake expires',
			},
			status: 'authenticated',
		});

		it('button renders correctly', () => {
			render(<SignInButton />);

			expect(screen.getByText('John Doe')).toBeInTheDocument();
		});
	});

	describe('whrn user is unauthenticated', () => {
		const useSessionMocked = jest.mocked(useSession);

		useSessionMocked.mockReturnValueOnce({
			data: null,
			status: 'unauthenticated',
		});

		it('button renders correctly', () => {
			render(<SignInButton />);

			expect(screen.getByText('Sign In with Github')).toBeInTheDocument();
		});
	});
});
