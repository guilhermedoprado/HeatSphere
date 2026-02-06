import styles from './IntroductionToConvection.module.css';

const IntroductionToConvection = () => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>Introduction to Convection</h2>
			<p className={styles.description}>
				Fundamentals and key dimensionless numbers for convection.
            <div className={styles.cta}>
            <a className={`${styles.button} ${styles.buttonSecondary}`} href="/modules/introduction-to-convection/documentation">
                View Documentation
            </a>
            </div>
			</p>
		</section>
	);
};

export default IntroductionToConvection;