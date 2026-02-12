import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const HomeHero = () => {
  return (
    <section className={styles.hero}>
      {/* Headline */}
      <div className={styles.headline}>
        <h2 className={styles.headlineText}>
          Master Heat Transfer,<br />One Module at a Time
        </h2>
        <p className={styles.headlineSub}>
          An interactive learning platform for convective heat transfer.
          Dive into theory, work through real calculations, and build
          engineering intuition — all in one place.
        </p>
        <div className={styles.cta}>
          <Link to="/modules" className={styles.button}>
            Explore Modules
          </Link>
          <Link to="/notes" className={styles.button}>
            My Notebook
          </Link>
        </div>
      </div>

      {/* What You'll Find Here */}
      <div className={styles.heroCard} role="presentation">
        <h3>AVAILABLE FEATURES</h3>
        <ul>
          <li><strong>Study Notes</strong> — Concise, review-ready summaries.</li>
          <li><strong>Formulary</strong> — All correlations and formulas, organized by topic.</li>
          <li><strong>Solvers</strong> — Correlation and calculation tools for various scenarios.</li>
          <li><strong>Exercises Sheets</strong> — Step-by-step worked examples.</li>
          <li><strong>Case Studies</strong> — Real-world engineering scenarios.</li>
          <li><strong>Data Visualization</strong> — Interactive charts and parameter exploration.</li>
        </ul>
      </div>
    </section>
  );
};

export default HomeHero;
