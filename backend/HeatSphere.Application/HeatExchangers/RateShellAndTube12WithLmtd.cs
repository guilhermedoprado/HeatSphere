using System;
using System.Collections.Generic;
using System.Text;

using HeatSphere.Domain.Common;
using HeatSphere.Domain.HeatExchangers;

namespace HeatSphere.Application.HeatExchangers;

public sealed record RateShellAndTube12Request(double ThInC, double ThOutC, double TcInC, double TcOutC);

public sealed record RateShellAndTube12Response(
    double DeltaT1,
    double DeltaT2,
    double LmtdCounterflow,
    double P,
    double R,
    double F,
    double LmtdCorrected);

public sealed class RateShellAndTube12WithLmtd
{
    public RateShellAndTube12Response Execute(RateShellAndTube12Request req)
    {
        var temps = new TerminalTemperatures(
            Temperature.FromCelsius(req.ThInC),
            Temperature.FromCelsius(req.ThOutC),
            Temperature.FromCelsius(req.TcInC),
            Temperature.FromCelsius(req.TcOutC));

        // Counterflow ΔT's
        var dT1 = temps.ThIn.Celsius - temps.TcOut.Celsius;
        var dT2 = temps.ThOut.Celsius - temps.TcIn.Celsius;

        if (dT1 <= 0 || dT2 <= 0) throw new ArgumentException("Invalid terminal temperatures (ΔT must be > 0).");

        var lmtd = (dT1 - dT2) / Math.Log(dT1 / dT2);

        // P, R (definições comuns para correção F)
        var P = (temps.TcOut.Celsius - temps.TcIn.Celsius) / (temps.ThIn.Celsius - temps.TcIn.Celsius);
        var R = (temps.ThIn.Celsius - temps.ThOut.Celsius) / (temps.TcOut.Celsius - temps.TcIn.Celsius);

        // Fórmula do F (1 shell pass, 2 tube passes) – cuidado com regiões inválidas (R≈1 etc.)
        // MVP: vamos calcular e deixar o front mostrar erro amigável se der NaN/Infinity.
        var S = Math.Sqrt(R * R + 1) / (R - 1);
        var W = (1 - P * R) / (1 - P);
        var F = (S * Math.Log(W)) /
                Math.Log((1 + W - S + S * W) / (1 + W + S - S * W));

        var lmtdCorr = F * lmtd;

        return new RateShellAndTube12Response(dT1, dT2, lmtd, P, R, F, lmtdCorr);
    }
}

