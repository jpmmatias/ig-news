import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Hero } from '../components';
import styles from '../styles/home.module.scss';
import { stripe } from '../services/stripe';
import formatToCurrency from '../utils/formatCurrency';

// Client-side - Quando não precisa se de SEO
// Server-side - Quando precisa de dados dinamico do usuário e contexto da requisição - Mais processamento que client side
// Static Site Generation - Home do Blog, Post do blog, Pagina de produto, categoria, necessita indexação, o que é igual para todo mundo

// Post do blog

// Conteudo - SSG
// Comentarios - Client Side

interface HomeProps {
	product: {
		priceId: string;
		amount: number;
	};
}

export default function Home({ product }: HomeProps) {
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

export const getStaticProps: GetStaticProps = async () => {
	const price = await stripe.prices.retrieve('price_1KZgPaHM0zDadpvBWLzc5nrk', {
		expand: ['product'],
	});

	const product = {
		priceId: price.id,
		amount: formatToCurrency(price.unit_amount / 100),
	};
	return {
		props: {
			product,
		},
		revalidate: 60 * 60 * 24, // 24 hours
	};
};
