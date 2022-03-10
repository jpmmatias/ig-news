import { GetServerSideProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import styles from './post.module.scss';

interface PostPros {
	post: { slug: string; title: string; content: string; updatedAt: string };
}

const Post = ({ post }: PostPros) => {
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
						className={styles.postContent}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</article>
			</main>
		</>
	);
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({
	params,
	req,
}) => {
	const session = await getSession({ req });
	const { slug } = params;

	if (!session.activeSubscription) {
		return {
			redirect: {
				destination: `/posts/preview/${slug}`,
				permanent: false,
			},
		};
	}

	const prismic = getPrismicClient(req);
	const response = await prismic.getByUID('post', String(slug));

	const post = {
		slug,
		title: RichText.asText(response.data.title),
		content: RichText.asHtml(response.data.content),
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
	};
};
