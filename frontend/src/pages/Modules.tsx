import styles from './Home.module.css';
import IntroductionToConvection from '../components/modules/IntroductionToConvection/IntroductionToConvection';
import ExternalFlow from '../components/modules/ExternalFlow/ExternalFlow';
import InternalFlow from '../components/modules/InternalFlow/InternalFlow';
import HeatExchangers from '../components/modules/HeatExchangers/HeatExchangers';
import FreeConvection  from '../components/modules/FreeConvection/FreeConvection';
import Boiling from '../components/modules/Boiling/Boiling';
import Condensation from '../components/modules/Condensation/Condensation';


const Modules = () => {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<IntroductionToConvection />
                <ExternalFlow />
                <InternalFlow />
                <HeatExchangers />
                <FreeConvection />
                <Boiling />
                <Condensation />
			</main>
		</div>
	);
};

export default Modules;









