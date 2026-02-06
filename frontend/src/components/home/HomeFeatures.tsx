import styles from './HomeFeatures.module.css';

const HomeFeatures = () => {
  return (
    <section className={styles.features}>
      <h3>Core Modules</h3>
      <div className={styles.featureGrid}>
        <article className={styles.feature}>
          <h4>Shell &amp; Tube Rating</h4>
          <p>Validate thermal duty and calculate LMTD in seconds.</p>
        </article>
        <article className={styles.feature}>
          <h4>Performance Dashboard</h4>
          <p>Track KPIs and compare scenarios across designs.</p>
        </article>
        <article className={styles.feature}>
          <h4>Reporting</h4>
          <p>Export results and assumptions for reviews.</p>
        </article>
      </div>
    </section>
  );
};

export default HomeFeatures;
