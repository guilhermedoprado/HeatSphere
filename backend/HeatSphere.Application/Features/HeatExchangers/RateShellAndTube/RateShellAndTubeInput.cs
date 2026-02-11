using HeatSphere.Domain.Entities;
using HeatSphere.Domain.Common;

namespace HeatSphere.Application.Features.HeatExchangers.RateShellAndTube;

public sealed record RateShellAndTubeInput(
    double ThInC, 
    double ThOutC, 
    double TcInC, 
    double TcOutC
);