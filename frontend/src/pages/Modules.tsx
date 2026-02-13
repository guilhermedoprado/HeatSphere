import { Link } from "react-router-dom";
import styles from "./Modules.module.css";

const modules = [
  {
    slug: "introduction-to-convection",
    label: "Introduction to Convection",
    module: 1,
    icon: "🌡️",
    description: "Boundary layers, convection coefficients, and the fundamentals of convective heat transfer.",
  },
  {
    slug: "external-flow",
    label: "External Flow",
    module: 2,
    icon: "💨",
    description: "Flow over flat plates, cylinders, spheres, and banks of tubes.",
  },
  {
    slug: "internal-flow",
    label: "Internal Flow",
    module: 3,
    icon: "🔧",
    description: "Pipe flow, entry lengths, fully developed conditions, and friction factors.",
  },
  {
    slug: "free-convection",
    label: "Free Convection",
    module: 4,
    icon: "🔥",
    description: "Buoyancy-driven flows on vertical plates, horizontal surfaces, and enclosures.",
  },
  {
    slug: "boiling",
    label: "Boiling",
    module: 5,
    icon: "♨️",
    description: "Pool boiling curve, flow boiling, and critical heat flux correlations.",
  },
  {
    slug: "condensation",
    label: "Condensation",
    module: 6,
    icon: "💧",
    description: "Film and dropwise condensation, Nusselt analysis for vertical and horizontal surfaces.",
  },
  {
    slug: "heat-exchangers",
    label: "Heat Exchangers",
    module: 7,
    icon: "⚙️",
    description: "LMTD and ε-NTU methods, shell-and-tube design, and compact exchangers.",
  },
];

export default function Modules() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.back}>← Home</Link>
        <div>
          <h1>Modules</h1>
          <p className={styles.subtitle}>
            Select a module to access its notes and tools.
          </p>
        </div>
      </header>

      <div className={styles.grid}>
        {modules.map((mod) => (
          <Link
            key={mod.slug}
            to={`/modules/${mod.slug}`}
            className={styles.card}
          >
            <div className={styles.cardTop}>
              <span className={styles.module}>Module {mod.module}</span>
              <span className={styles.icon} aria-hidden="true">{mod.icon}</span>
            </div>

            <h3 className={styles.cardTitle}>{mod.label}</h3>
            <p className={styles.cardDesc}>{mod.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}









