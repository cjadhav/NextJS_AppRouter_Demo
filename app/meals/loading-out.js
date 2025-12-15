import styles from './loading.module.css';

function LoadingPage() {
  return <p className={styles.loading}>fetching Meals</p>;
}
export default LoadingPage;

//As it's blocking complete UI so using within Suspense of Fallback
