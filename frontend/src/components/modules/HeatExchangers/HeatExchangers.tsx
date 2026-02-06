import styles from './HeatExchangers.module.css';
import { ShellTubeRating } from './ShellTubeRating.tsx';

const HeatExchangers = () => {
  return (
    <><></><section className={styles.hero}>
      <div className={styles.heroContent}>
        <h2>Design, rate, and optimize heat exchangers.</h2>
        <p>
          Calculate thermal models, compare configurations, and share results
          with your team.
        </p>
        <h3>Quick Start</h3>
          <p>1. Define stream temperatures</p>
          <p>2. Select exchanger type</p>
          <p>3. Generate performance report</p>
        <div className={styles.cta}>
          <a className={`${styles.button} ${styles.buttonSecondary}`} href="/docs">
            View Documentation
          </a>
        </div>
      </div>
    </section><section>
        <ShellTubeRating />
      </section></>
  );
};

export default HeatExchangers;
