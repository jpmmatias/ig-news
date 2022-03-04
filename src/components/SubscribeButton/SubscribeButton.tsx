import styles from './style.module.scss';

interface SubscriptionProrps {
	id: number;
}
const SubscribeButton = ({ id }: SubscriptionProrps) => {
	return <button className={styles.subscribeButton}>Subscribe Now</button>;
};

export default SubscribeButton;
