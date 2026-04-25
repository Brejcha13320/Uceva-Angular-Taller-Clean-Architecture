import { TestBed } from "@angular/core/testing";
import { GetAllVehiclesUseCase } from "./get-all-vehicles.usecase";
import { VehicleRepository } from "../../domain/repositories/vehicle.repository";
import { firstValueFrom, of, throwError } from "rxjs";
import { VEHICLES_MOCK} from "../../../mocks/vehicles.mocks";


describe('GetAllVehiclesUseCase', () => {
  let useCase: GetAllVehiclesUseCase;

  const countVehicles = 5;
  const VehicleRepositoryMock: jest.Mocked<VehicleRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetAllVehiclesUseCase,
            { provide: VehicleRepository, useValue: VehicleRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllVehiclesUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllVehiclesUseCase);
  });

  it('debería delegar la llamada del repository', async () => {
    VehicleRepositoryMock.getAll.mockReturnValue(of(VEHICLES_MOCK));
    const result = await firstValueFrom(useCase.execute(countVehicles));
    expect(VehicleRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.getAll).toHaveBeenCalledWith(countVehicles);
    expect(result).toEqual(VEHICLES_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de vehiculos';
    VehicleRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result = useCase.execute(countVehicles);
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);
    expect(VehicleRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.getAll).toHaveBeenCalledWith(countVehicles);
  });

});
