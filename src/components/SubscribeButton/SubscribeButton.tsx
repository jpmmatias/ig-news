import styles from './style.module.scss';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';

// Para informações secretas - como secrets de apis
// getServerSideProps (SSR)
// getStaticProps (SSG)
// API Routes - > Melhor para quando depende de execução do usuário, como o clique de um botão

interface SubscriptionProrps {
	id: string;
}
const SubscribeButton = ({ id }: SubscriptionProrps) => {
	const { data: session } = useSession();
	const userNotLogged = !session;

	async function handleSubscribe() {
		if (userNotLogged) {
			signIn('github');
			return;
		}

		try {
			const response = await api.post('/subscribe');
			const { sessionId } = response.data;
			console.log(sessionId);
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
