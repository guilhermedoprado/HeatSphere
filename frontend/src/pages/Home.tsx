import { Link } from 'react-router-dom';
import styles from './Home.module.css';

// Components
import Header from '../components/layout/Header'; // Certifique-se que Header aceita className ou style para transparência
import Hero from '../features/landing-page/components/Hero';
import Footer from '../features/landing-page/components/Footer';

// Assets
import bgImage from '../assets/wood-stick-burning-high-angle.jpg';

const Home = () => {
    // Helper function for smooth scrolling
    const scrollToContent = () => {
        document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.container}>
            
            {/* Full-screen landing section */}
            <section className={styles.landing}>
                
                {/* Floating Header (Transparent) */}
                <div className={styles.absoluteHeader}>
                    <Header /> 
                </div>

                {/* Background */}
                <img src={bgImage} alt="Burning match stick" className={styles.bgImage} />
                <div className={styles.overlay} />

                {/* Central Content */}
                <div className={styles.brandCenter}>
                    <h1 className={styles.brandTitle}>HeatSphere</h1>
                    <p className={styles.brandTagline}>Convective Heat Transfer — Visualized</p>
                    
                    {/* CTAs */}
                    <div className={styles.ctaGroup}>
                        <Link to="/modules" className={styles.btnPrimary}>
                            Explore Modules
                        </Link>
                        <Link to="/my-notes" className={styles.btnSecondary}>
                            My Notebook
                        </Link>
                    </div>
                </div>

                {/* Scroll Hint */}
                <div 
                    className={styles.scrollHint} 
                    onClick={scrollToContent} 
                    role="button" 
                    tabIndex={0} 
                    onKeyDown={(e) => e.key === 'Enter' && scrollToContent()}
                    aria-label="Scroll down"
                >
                    &#8595;
                </div>
            </section>
            {/* Main Content Section */}
            <main id="content" className={styles.main}>
                <Hero /> 
            </main>
            {/* Footer Section */}
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
