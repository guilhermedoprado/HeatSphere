import styles from './Home.module.css';
import HomeFeatures from '../components/home/HomeFeatures.tsx';
import HomeFooter from '../components/home/HomeFooter.tsx';
import HomeHeader from '../components/home/HomeHeader.tsx';
import HomeHero from '../components/home/HomeHero';

const Home = () => {
	return (
		<div className={styles.container}>
			<HomeHeader />
			<main className={styles.main}>
				<HomeHero />

			</main>
			<HomeFooter />
		</div>
	);
};

export default Home;









