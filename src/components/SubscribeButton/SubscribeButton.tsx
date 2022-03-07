import styles from './style.module.scss';

interface SubscriptionProrps {
	id: string;
}
const SubscribeButton = ({ id }: SubscriptionProrps) => {
	return <button className={styles.subscribeButton}>Subscribe Now</button>;
};

export default SubscribeButton;
