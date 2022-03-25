import { fireEvent, render, screen } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SubscribeButton from './SubscribeButton';

jest.mock('next/router');

jest.mock('next-auth/react');

jest.mock('next-auth/react');

describe('SubscribeButton Component', () => {
	it('render button correctly ', () => {
		const useSessionMocked = jest.mocked(useSession);

		useSessionMocked.mockReturnValueOnce({
			data: null,
			status: 'loading',
		});

		render(<SubscribeButton />);

		expect(screen.getByText('Subscribe Now')).toBeInTheDocument();
	});

	describe('when user not authenticated', () => {
		it('redirects user to sign in', () => {
			const useSessionMocked = jest.mocked(useSession);

			// Alterei o status para `unauthenticated` pois no seu código você utilizou esse status para saber se o usuário está ou não logado
			useSessionMocked.mockReturnValueOnce({
				data: null,
				status: 'unauthenticated',
			});

			//Fiz o render somente após os mocks
			render(<SubscribeButton />);

			const subscribeButton = screen.getByText('Subscribe Now');

			fireEvent.click(subscribeButton);

			const mockedSignIn = jest.mocked(signIn);
			expect(mockedSignIn).toHaveBeenCalled();
		});
	});

	describe('when user is authenticated', () => {
		it('redirect user to posts', () => {
			//Removi o render do começo do arquivo e deixei os mocks em primeiro
			const useSessionMocked = jest.mocked(useSession);
			const useRouterMocked = jest.mocked(useRouter);

			const pushMock = jest.fn();

			useSessionMocked.mockReturnValueOnce({
				data: {
					user: { name: 'John Doe', email: 'john.doe@example.com' },
					expires: 'fake-expires',
					activeSubscription: 'fake-subscription', //Adicionei o mock da subscription
				},
				status: 'authenticated',
			});

			useRouterMocked.mockReturnValueOnce({
				push: pushMock,
			} as any);

			// Fiz o render somente após os mocks
			render(<SubscribeButton />);

			// Removi o mock da função `signIn` pois ela não é utilizada nesse teste

			const subscribeButton = screen.getByText('Subscribe Now');

			fireEvent.click(subscribeButton);

			// Removi o expect da função de `signIn` pois ela também não é utilizada nesse teste
			expect(pushMock).toHaveBeenCalled();
		});
	});
});
