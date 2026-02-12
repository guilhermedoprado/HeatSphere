import { useState } from "react";
import axios from "axios";
import styles from "./CylinderFlow.module.css"; // Importe o CSS Module

type ResponseDto = {
    id: string;
    name: string;
    diameter: number;
    velocity: number;
    fluidTemperatureK: number;
    surfaceTemperatureK: number;
    filmTemperature: number;
    kinematicViscosity: number;
    prandtl: number;
    thermalConductivity: number;
    reynolds: number;
    nusselt: number;
    heatTransferCoefficient: number;
    heatFlux: number;
};

export function CylinderFlowCalculator() {
    // Inputs (valores iniciais de exemplo)
    const [name, setName] = useState("Cilindro 1");
    const [diameter, setDiameter] = useState(0.05);         // metros
    const [velocity, setVelocity] = useState(10);           // m/s
    const [fluidTemp, setFluidTemp] = useState(300);        // Kelvin
    const [surfaceTemp, setSurfaceTemp] = useState(350);    // Kelvin

    // Resultado da API
    const [res, setRes] = useState<ResponseDto | null>(null);
    
    // Controla visibilidade dos inputs
    const [showInputs, setShowInputs] = useState(true);

    async function run() {
        const { data } = await axios.post<ResponseDto>("/api/cylinder-flow/calculate", {
            name: name,
            diameter: diameter,
            velocity: velocity,
            fluidTemperature: fluidTemp,       // ⚠️ Ajuste os nomes conforme o C# Request
            surfaceTemperature: surfaceTemp
        });
        setRes(data);
        setShowInputs(true); // Esconde inputs após calcular
    }

    return (
        <div className={styles.container}>
            <div className={styles.container}>
                <h1 className={styles.title}>Cylinder Flow Solver</h1>
                <p className={styles.description}>
                    Calculate heat transfer coefficients for cross-flow over a circular cylinder using Churchill-Bernstein correlation.
                </p>
            </div>

            {/* Inputs sempre visíveis ou controlados por showInputs, como preferir */}
            <div className={styles.inputsContainer}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Identifier</label>
                    <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Diameter (D)</label>
                    <input type="number" className={styles.input} value={diameter} onChange={(e) => setDiameter(+e.target.value)} placeholder="m" />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Velocity (V)</label>
                    <input type="number" className={styles.input} value={velocity} onChange={(e) => setVelocity(+e.target.value)} placeholder="m/s" />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Fluid Temp (T∞)</label>
                    <input type="number" className={styles.input} value={fluidTemp} onChange={(e) => setFluidTemp(+e.target.value)} placeholder="K" />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Surface Temp (Ts)</label>
                    <input type="number" className={styles.input} value={surfaceTemp} onChange={(e) => setSurfaceTemp(+e.target.value)} placeholder="K" />
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.primaryButton} onClick={run}>Calculate</button>
                {res && <button className={styles.secondaryButton} onClick={() => setRes(null)}>Clear Results</button>}
            </div>

            {res && (
                <div className={styles.resultsContainer}>
                    {/* Card de Resultado Principal */}
                    <div className={styles.resultCard}>
                        <span className={styles.resultLabel}>Heat Transfer Coeff. (h)</span>
                        <div className={styles.resultValue}>
                            <span className={styles.highlight}>{res.heatTransferCoefficient.toFixed(2)}</span>
                            <span className={styles.resultUnit}>W/(m²·K)</span>
                        </div>
                    </div>

                    <div className={styles.resultCard}>
                        <span className={styles.resultLabel}>Heat Flux (q")</span>
                        <div className={styles.resultValue}>
                            {res.heatFlux.toFixed(2)}
                            <span className={styles.resultUnit}>W/m²</span>
                        </div>
                    </div>

                    <div className={styles.resultCard}>
                        <span className={styles.resultLabel}>Nusselt Number (Nu)</span>
                        <div className={styles.resultValue}>{res.nusselt.toFixed(2)}</div>
                    </div>

                    <div className={styles.resultCard}>
                        <span className={styles.resultLabel}>Reynolds Number (Re)</span>
                        <div className={styles.resultValue}>{res.reynolds.toExponential(2)}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
