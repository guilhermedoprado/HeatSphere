import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const HomeHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h1>HeatSphere</h1>
        </div>
      <nav className={styles.nav} aria-label="Primary">
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/modules" className={styles.link}>
          Modules
        </Link>
        <Link to="/about" className={styles.link}>
          About
        </Link>
      </nav>
    </header>
  );
};

export default HomeHeader;
