using MediatR;
using HeatSphere.Domain.Entities;
using HeatSphere.Application.Services;

namespace HeatSphere.Application.Features.ExternalFlow.CalculateCylinder;

public class CalculateCylinderFlowHandler : IRequestHandler<CalculateCylinderFlowRequest, CalculateCylinderFlowResponse>
{
    private readonly FluidInterpolationService _fluidService;

    public CalculateCylinderFlowHandler(FluidInterpolationService fluidService)
    {
        _fluidService = fluidService;
    }

    public async Task<CalculateCylinderFlowResponse> Handle(CalculateCylinderFlowRequest request, CancellationToken cancellationToken)
    {
        // 1. Instancia a Entidade de Domínio (já calcula a FilmTemperature no construtor)
        var caseStudy = new CylinderExternalFlowCaseStudy(
            request.Name,
            request.Diameter,
            request.Velocity,
            request.FluidTemperature,
            request.SurfaceTemperature
        );

        // 2. Define o ID do fluido "Ar" (Hardcoded por enquanto, ou viria do request no futuro)
        var airFluidId = Guid.Parse("11111111-1111-1111-1111-111111111111");

        // 3. Busca propriedades interpoladas usando a temperatura de filme calculada pela entidade
        var fluidProperties = await _fluidService.GetPropertiesForTemperatureAsync(
            airFluidId,
            caseStudy.FilmTemperature
        );

        // 4. Executa o cálculo principal (Reynolds, Nusselt, h, q")
        caseStudy.Calculate(fluidProperties);

        // 5. (Opcional) Salvar no banco aqui usando um Repository
        // await _repository.AddAsync(caseStudy); 

        // 6. Mapeia para o Output (DTO)
        return new CalculateCylinderFlowResponse(
            caseStudy.Id,
            caseStudy.Name,
            caseStudy.Diameter,
            caseStudy.Velocity,
            caseStudy.FluidTemperature,
            caseStudy.SurfaceTemperature,
            caseStudy.FilmTemperature,
            caseStudy.KinematicViscosity,
            caseStudy.Prandtl,
            caseStudy.ThermalConductivity,
            caseStudy.Reynolds,
            caseStudy.Nusselt,
            caseStudy.HeatTransferCoefficient,
            caseStudy.HeatFlux
        );
    }
}
