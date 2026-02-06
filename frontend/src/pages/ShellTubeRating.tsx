import { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
  const [tcOutC, setTcOutC] = useState(80);
  const [res, setRes] = useState<ResponseDto | null>(null);

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
    <div style={{ padding: 16 }}>
      <h2>Shell-and-tube 1–2 (Rating)</h2>

      <button onClick={run}>Calcular</button>

      {res && (
        <div style={{ marginTop: 12 }}>
          <div>F: {res.f.toFixed(4)}</div>
          <div>LMTD: {res.lmtdCounterflow.toFixed(2)} °C</div>
          <div>LMTD corrigida: {res.lmtdCorrected.toFixed(2)} °C</div>
        </div>
      )}

      <div style={{ height: 280, marginTop: 16 }}>
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
