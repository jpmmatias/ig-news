import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Hero } from '../components';
import styles from '../styles/home.module.scss';
import { stripe } from '../services/stripe';
import formatToCurrency from '../utils/formatCurrency';

interface HomeProps {
	product: {
		priceId: string;
		amount: number;
	};
}

export default function Home({ product }) {
	return (
		<>
			<Head>
				<title>Home | ig.news</title>
			</Head>
			<main className={styles.contentContainer}>
				<Hero price={product.amount} priceId={product.priceId} />
				<img src='/images/avatar.svg' alt='Garota programando' />
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const price = await stripe.prices.retrieve('price_1KZgPaHM0zDadpvBWLzc5nrk', {
		expand: ['product'],
	});
	console.log(price);
	const product = {
		priceId: price.id,
		amount: formatToCurrency(price.unit_amount / 100),
	};
	return {
		props: {
			product,
		},
	};
};
