import { Link, useParams } from 'react-router-dom';
import styles from './ToolPage.module.css';

const ToolPage = () => {
  const { slug, toolSlug } = useParams();

  // Database de recursos por ferramenta
  const toolData: Record<string, any> = {
    'calculation-sheets': {
      title: 'Calculation Sheets',
      tagline: 'Pre-structured templates for common problems',
      items: [
        { id: 'pipe-flow-pressure-drop', name: 'Pipe Flow - Pressure Drop', status: 'available' },
        { id: 'heat-exchanger-lmtd', name: 'Heat Exchanger - LMTD Method', status: 'available' },
        { id: 'natural-convection-plate', name: 'Natural Convection - Vertical Plate', status: 'soon' },
        { id: 'forced-convection-tube', name: 'Forced Convection - Internal Tube', status: 'soon' },
      ]
    },
    'formulary': {
      title: 'Formulary',
      tagline: 'All correlations and equations, organized by topic',
      items: [
        { id: 'nusselt-correlations', name: 'Nusselt Number Correlations', status: 'available' },
        { id: 'friction-factors', name: 'Friction Factors (Moody, Churchill)', status: 'available' },
        { id: 'dimensionless-numbers', name: 'Dimensionless Numbers Reference', status: 'available' },
        { id: 'film-temperature', name: 'Film Temperature Calculations', status: 'soon' },
      ]
    },
    'solvers': {
      title: 'Solvers',
      tagline: 'Interactive calculators for design and analysis',
      items: [
        { id: 'cylinder-flow', name: 'Flow Over Cylinder', status: 'available' },
        { id: 'pipe-flow-solver', name: 'Internal Pipe Flow Solver', status: 'available' },
        { id: 'shell-tube-rating', name: 'Shell & Tube Heat Exchanger Rating', status: 'available' },
        { id: 'fin-effectiveness', name: 'Fin Effectiveness Calculator', status: 'soon' },
        { id: 'natural-convection-enclosure', name: 'Natural Convection in Enclosures', status: 'soon' },
      ]
    },
    'case-studies': {
      title: 'Case Studies',
      tagline: 'Real-world scenarios with annotated solutions',
      items: [
        { id: 'cooling-electronic-enclosure', name: 'Cooling Electronic Enclosure', status: 'available' },
        { id: 'steam-condenser-design', name: 'Steam Condenser Design Optimization', status: 'soon' },
        { id: 'hvac-duct-sizing', name: 'HVAC Duct Sizing & Pressure Drop', status: 'soon' },
        { id: 'heat-sink-thermal-analysis', name: 'Heat Sink Thermal Analysis', status: 'soon' },
      ]
    }
  };

  const data = toolData[toolSlug || ''] || { title: 'Tool', items: [] };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <Link to={`/modules/${slug}/tool`} className={styles.backLink}>
          ← Tools
        </Link>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.tagline}>{data.tagline}</p>
      </header>

      {/* Catalog Grid */}
      <section className={styles.catalog}>
        <div className={styles.grid}>
          {data.items.map((item: any) => (
            <Link
              key={item.id}
              to={`./${item.id}`}
              className={`${styles.card} ${item.status === 'soon' ? styles.cardDisabled : ''}`}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                {item.status === 'soon' && (
                  <span className={styles.badge}>Coming Soon</span>
                )}
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.arrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolPage;
