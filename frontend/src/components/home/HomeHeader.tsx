import { Link } from 'react-router-dom';
import styles from './HomeHeader.module.css';

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
        <div className={styles.menu}>
          <button
            type="button"
            className={styles.menuButton}
            aria-haspopup="true"
            aria-expanded="false"
          >
            Modules
          </button>
          <div className={styles.menuList} role="menu">
            <Link to="/modules/introduction-to-convection" className={styles.menuItem} role="menuitem">
              Introduction to Convection
            </Link>
            <Link to="/modules/external-flow" className={styles.menuItem} role="menuitem">
              External Flow
            </Link>
            <Link to="/modules/internal-flow" className={styles.menuItem} role="menuitem">
              Internal Flow
            </Link>
            <Link to="/modules/heat-exchangers" className={styles.menuItem} role="menuitem">
              Heat Exchangers
            </Link>
            <Link to="/modules/free-convection" className={styles.menuItem} role="menuitem">
              Free Convection
            </Link>
            <Link to="/modules/boiling" className={styles.menuItem} role="menuitem">
              Boiling
            </Link>
            <Link to="/modules/condensation" className={styles.menuItem} role="menuitem">
              Condensation
            </Link>
          </div>
        </div>
        <Link to="/about" className={styles.link}>
          About
        </Link>
      </nav>
    </header>
  );
};

export default HomeHeader;
