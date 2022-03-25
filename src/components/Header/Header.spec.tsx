import { render, screen } from '@testing-library/react';
import Header from './Header';

jest.mock('next/router', () => {
	return {
		useRouter() {
			return { asPath: '/' };
		},
	};
});

jest.mock('next-auth/react', () => {
	return {
		useSession() {
			return { data: { user: { name: 'User' } }, status: 'authenticated' };
		},
	};
});

describe('Header Component', () => {
	it('header renders correctly', () => {
		render(<Header />);

		expect(screen.getByText('Posts')).toBeInTheDocument();
		expect(screen.getByText('Home')).toBeInTheDocument();
	});
});
