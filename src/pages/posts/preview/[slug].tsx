import { GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import styles from '../post.module.scss';
import { getPrismicClient } from '../../../services/prismic';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface PostPreviewPros {
	post: { slug: string; title: string; content: string; updatedAt: string };
}

const PostPreview = ({ post }: PostPreviewPros) => {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session?.activeSubscription) {
			router.push(`/posts/${post.slug}`);
		}
	}, [session, post, router]);

	return (
		<>
			<Head>
				<title>{post.title} | Ignews</title>
			</Head>

			<main className={styles.container}>
				<article className={styles.post}>
					<h1>{post.title}</h1>
					<time>{post.updatedAt}</time>
					<div
						className={`${styles.postContent} ${styles.previewContent}`}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
					<div className={styles.continueReading}>
						Wanna continue reading?
						<Link href='/'>
							<a>Subscribe Now</a>
						</Link>
					</div>
				</article>
			</main>
		</>
	);
};

export default PostPreview;

export const getStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
		//true - Se alguem tentar acessar um post que não gerado de forma estatica - Não é bom pra ceo
		// false  - se não foi gerado de forma estatica ainda, da um 404
		// blocking - só mostra o html quando ele foi gerado - quando pode surgir novos conteudos
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params;
	const prismic = getPrismicClient();
	const response = await prismic.getByUID('post', String(slug));

	const post = {
		slug,
		title: RichText.asText(response.data.title),
		content: RichText.asHtml(response.data.content.splice(0, 3)),
		updatedAt: new Date(response.last_publication_date).toLocaleDateString(
			'pt-BR',
			{
				day: '2-digit',
				month: 'short',
				year: 'numeric',
			}
		),
	};

	return {
		props: { post },
		redirect: 60 * 30, // 30 minutos
	};
};
