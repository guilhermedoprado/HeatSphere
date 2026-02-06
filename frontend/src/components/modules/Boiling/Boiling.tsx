import styles from './Boiling.module.css';

const Boiling = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Boiling</h2>
      <p className={styles.description}>
        Pool and flow boiling regimes with key parameters.
      </p>
    </section>
  );
};

export default Boiling;
