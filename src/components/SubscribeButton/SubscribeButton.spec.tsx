import { fireEvent, render, screen } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SubscribeButton from './SubscribeButton';

jest.mock('next/router');

jest.mock('next-auth/react');

jest.mock('next-auth/react');

describe('SubscribeButton Component', () => {
	it('render button correctly ', () => {
		render(<SubscribeButton />);

		expect(screen.getByText('Subscribe Now')).toBeInTheDocument();
	});

	describe('when user not authenticated', () => {
		it('redirects user to sign in', () => {
			render(<SubscribeButton />);

			const useSessionMocked = jest.mocked(useSession);
			useSessionMocked.mockReturnValueOnce({ data: null, status: 'loading' });

			const subscribeButton = screen.getByText('Subscribe Now');

			fireEvent.click(subscribeButton);

			const mockedSignIn = jest.mocked(signIn);

			expect(mockedSignIn).toHaveBeenCalled();
		});
	});

	describe('when user is authenticated', () => {
		it('redirect user to posts', () => {
			render(<SubscribeButton />);

			const useSessionMocked = jest.mocked(useSession);
			const useRouterMocked = jest.mocked(useRouter);

			const pushMock = jest.fn();

			useSessionMocked.mockReturnValueOnce({
				data: {
					user: { name: 'John Doe', email: 'john.doe@example.com' },
					expires: 'fake-expires',
				},
				status: 'authenticated',
			});

			useRouterMocked.mockReturnValueOnce({
				push: pushMock,
			} as any);

			const subscribeButton = screen.getByText('Subscribe Now');

			fireEvent.click(subscribeButton);
			const mockedSignIn = jest.mocked(signIn);

			expect(mockedSignIn).toHaveBeenCalled();

			expect(pushMock).toHaveBeenCalled();
		});
	});
});
