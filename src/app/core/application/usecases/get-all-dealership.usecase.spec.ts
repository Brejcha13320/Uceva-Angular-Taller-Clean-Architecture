import { TestBed } from "@angular/core/testing";
import { firstValueFrom, of, throwError } from "rxjs";
import { GetAllDealershipsUseCase } from "./get-all-dealership.usecase";
import { DealershipRepository } from "../../domain/repositories/dealership.repository";
import { DEALERSHIPS_MOCK } from "../../../mocks/dealerships.mocks";


describe('GetAllDealershipsUseCase', () => {
  let useCase: GetAllDealershipsUseCase;

  const countVehicles = 5;
  const DealershipRepositoryMock: jest.Mocked<DealershipRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetAllDealershipsUseCase,
            { provide: DealershipRepository, useValue: DealershipRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllDealershipsUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllDealershipsUseCase);
  });

  it('debería delegar la llamada del repository', async () => {
    DealershipRepositoryMock.getAll.mockReturnValue(of(DEALERSHIPS_MOCK));
    const result = await firstValueFrom(useCase.execute(countVehicles));
    expect(DealershipRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(DealershipRepositoryMock.getAll).toHaveBeenCalledWith(countVehicles);
    expect(result).toEqual(DEALERSHIPS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de vehiculos';
    DealershipRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result = useCase.execute(countVehicles);
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);
    expect(DealershipRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(DealershipRepositoryMock.getAll).toHaveBeenCalledWith(countVehicles);
  });

});
