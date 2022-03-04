import { SubscribeButton } from '..';
import styles from './styles.module.scss';

interface HeroProps {
	price: number;
	priceId: string;
}

const Hero = ({ price, priceId }: HeroProps) => {
	return (
		<section className={styles.hero}>
			<span> 👏 Hey, welcome</span>
			<h1>
				News about the <span>React</span> world.
			</h1>
			<p>
				Get access to all the publications <br />
				<span>for R$ {price} per month</span>
			</p>
			<SubscribeButton id={priceId} />
		</section>
	);
};

export default Hero;
