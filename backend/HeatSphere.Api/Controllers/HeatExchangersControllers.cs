using Microsoft.AspNetCore.Mvc;
using HeatSphere.Application.Features.HeatExchangers.RateShellAndTube;

namespace HeatSphere.Api.Controllers;

[ApiController]
[Route("api/heat-exchangers/shell-tube/1-2/rating")]
public sealed class HeatExchangersController : ControllerBase
{
    private readonly RateShellAndTubeHandler _handler;

    public HeatExchangersController(RateShellAndTubeHandler handler) 
    {
        _handler = handler;
    }

    [HttpPost]
    public IActionResult Create([FromBody] RateShellAndTubeInput input)
    {
        // 1. Executa o cálculo (Síncrono)
        // Verifique se o método no Handler se chama 'Execute' ou 'Handle'
        var result = _handler.Execute(input); 

        // 2. Retorna 200 OK com o JSON do resultado
        return Ok(result);
    }
}
