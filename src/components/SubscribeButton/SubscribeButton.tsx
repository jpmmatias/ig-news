import styles from './style.module.scss';
import { useSession, getSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';
import { useRouter } from 'next/router';

// Para informações secretas - como secrets de apis
// getServerSideProps (SSR)
// getStaticProps (SSG)
// API Routes - > Melhor para quando depende de execução do usuário, como o clique de um botão

interface SubscriptionProrps {
	id: string;
}
const SubscribeButton = ({ id }: SubscriptionProrps) => {
	const { data: session } = useSession();
	const router = useRouter();
	const userNotLogged = !session;
	console.log(session);
	async function handleSubscribe() {
		if (userNotLogged) {
			signIn('github');
			return;
		}
		if (session.activeSubscription !== null) {
			router.push('/posts');
			return;
		}

		try {
			const response = await api.post('/subscribe');
			const { sessionId } = response.data;
			const stripe = await getStripeJS();

			stripe.redirectToCheckout({ sessionId });
		} catch (error) {
			alert(error.message);
		}
	}
	return (
		<button onClick={handleSubscribe} className={styles.subscribeButton}>
			Subscribe Now
		</button>
	);
};

export default SubscribeButton;
