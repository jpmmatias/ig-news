import { SubscribeButton } from '..';
import styles from './styles.module.scss';

interface HeroProps {
	price: number | string;
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
				<span>for {price} per month</span>
			</p>
			<SubscribeButton />
		</section>
	);
};

export default Hero;
