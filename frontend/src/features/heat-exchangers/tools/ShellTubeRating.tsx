import { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import styles from "./ShellTubeRating.module.css";

type ResponseDto = {
  deltaT1: number;
  deltaT2: number;
  lmtdCounterflow: number;
  p: number;
  r: number;
  f: number;
  lmtdCorrected: number;
};

export function ShellTubeRating() {
  const [thInC, setThInC] = useState(150);
  const [thOutC, setThOutC] = useState(100);
  const [tcInC, setTcInC] = useState(30);
  const [tcOutC, setTcOutC] = useState(90);
  const [res, setRes] = useState<ResponseDto | null>(null);
  const [showInputs, setShowInputs] = useState(false);

  async function run() {
    const { data } = await axios.post<ResponseDto>("/api/heat-exchangers/shell-tube/1-2/rating", {
    thInC, thOutC, tcInC, tcOutC
    });
    setRes(data);
  }

  const chartData = [
    { x: 0.0, hot: thInC, cold: tcInC },
    { x: 1.0, hot: thOutC, cold: tcOutC },
  ];

   return (
    <div className={styles.shellTubeRating}>
      {!showInputs ? (
        <button className={styles.button} onClick={() => setShowInputs(true)}>
          Start Shell &amp; Tube Rating
        </button>
      ) : (
        <>
          <div className={styles.inputs}>
            <label className={styles.inputGroup}>
              <span>Th In (°C)</span>
              <input
                type="number"
                value={thInC}
                onChange={(e) => setThInC(Number(e.target.value))}
              />
            </label>
            <label className={styles.inputGroup}>
              <span>Th Out (°C)</span>
              <input
                type="number"
                value={thOutC}
                onChange={(e) => setThOutC(Number(e.target.value))}
              />
            </label>
            <label className={styles.inputGroup}>
              <span>Tc In (°C)</span>
              <input
                type="number"
                value={tcInC}
                onChange={(e) => setTcInC(Number(e.target.value))}
              />
            </label>
            <label className={styles.inputGroup}>
              <span>Tc Out (°C)</span>
              <input
                type="number"
                value={tcOutC}
                onChange={(e) => setTcOutC(Number(e.target.value))}
              />
            </label>
          </div>

          <button className={styles.button} onClick={run}>
            Calcular
          </button>
        </>
      )}

      {res && (
        <div className={styles.results}>
          <div>Delta T1: {res.deltaT1.toFixed(2)} °C</div>
          <div>Delta T2: {res.deltaT2.toFixed(2)} °C</div>
          <div>P: {res.p.toFixed(4)}</div>
          <div>R: {res.r.toFixed(4)}</div>
          <div>F: {res.f.toFixed(4)}</div>
          <div>LMTD: {res.lmtdCounterflow.toFixed(2)} °C</div>
          <div>LMTD corrigida: {res.lmtdCorrected.toFixed(2)} °C</div>
        </div>
      )}

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line type="linear" dataKey="hot" stroke="#ff0000" dot={false} />
            <Line type="linear" dataKey="cold" stroke="#0000ff" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
