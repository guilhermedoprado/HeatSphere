// src/pages/ExternalFlow.tsx
import { Link } from 'react-router-dom'; // Importante!
import styles from './ExternalFlow.module.css';

const ExternalFlow = () => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>External Flow</h2>
            <p className={styles.description}>
                Crossflow and external convection around bodies.
            </p>
            
            {/* Botão/Link para ir para a Calculadora */}
            <nav>
                <Link to="/modules/external-flow/solver/cylinder-flow">
                    Go to Cylinder Flow Solver
                </Link>
            </nav>
        </section>
    );
};

export default ExternalFlow;
