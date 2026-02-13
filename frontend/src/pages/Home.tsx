import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Hero from '../features/landing-page/components/Hero';
import Footer from '../features/landing-page/components/Footer';
import bgImage from '../assets/wood-stick-burning-high-angle.jpg';

const Home = () => {
    const scrollToContent = () => {
        document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.container}>
            {/* Full-screen landing */}
            <section className={styles.landing}>
                {/* ❌ REMOVIDO: <div className={styles.absoluteHeader}> */}

                <img src={bgImage} alt="Burning match stick" className={styles.bgImage} />
                <div className={styles.overlay} />

                <div className={styles.brandCenter}>
                    <h1 className={styles.brandTitle}>HeatSphere</h1>
                    <p className={styles.brandTagline}>Convective Heat Transfer — Visualized</p>
                    
                    {/* CTAs únicos aqui */}
                    <div className={styles.ctaGroup}>
                        <Link to="/modules" className={styles.btnPrimary}>
                            Explore Modules
                        </Link>
                        <Link to="/my-notes" className={styles.btnPrimary}>
                            My Notebook
                        </Link>
                    </div>
                </div>

                <div 
                    className={styles.scrollHint} 
                    onClick={scrollToContent}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && scrollToContent()}
                    aria-label="Scroll to learn more"
                >
                    &#8595;
                </div>
            </section>

            {/* Hero SEM repetir CTAs */}
            <main id="content" className={styles.main}>
                <Hero /> 
            </main>
            <nav className={styles.quickNav}>
                <Link to="/modules">Modules</Link>
                <Link to="/my-notes">My Notes</Link>
                <Link to="/about">About</Link>
            </nav>
            <Footer />
        </div>
    );
};

export default Home;
