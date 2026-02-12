import { Link } from 'react-router-dom';
import styles from './HeatExchangers.module.css';
import { ShellTubeRating } from './ShellTubeRating.tsx';
import bannerImg from '../../../assets/heat-exchangers-case-study.jpg';

const HeatExchangers = () => {
  return (
    <div className={styles.page}>
      {/* Notion-style banner */}
      <div className={styles.banner}>
        <img src={bannerImg} alt="" className={styles.bannerImage} />
        <div className={styles.bannerOverlay} />
      </div>

      <div className={styles.content}>
        <Link to="/modules/heat-exchangers" className={styles.back}>← Heat Exchangers</Link>

        <h1 className={styles.title}>Case Study: Shell & Tube Rating</h1>
        <p className={styles.subtitle}>
          Design, rate, and optimize a 1-2 shell-and-tube heat exchanger using the LMTD correction factor method.
        </p>

        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNum}>1</span>
            <span>Define the inlet and outlet temperatures for both streams</span>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>2</span>
            <span>Run the calculation to get LMTD, correction factor F, and corrected LMTD</span>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>3</span>
            <span>Analyze the temperature profile chart</span>
          </div>
        </div>

        <hr className={styles.divider} />

        <ShellTubeRating />
      </div>
    </div>
  );
};

export default HeatExchangers;
