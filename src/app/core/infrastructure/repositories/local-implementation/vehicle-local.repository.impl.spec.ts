
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VEHICLES_MOCK } from '../../../../mocks/vehicles.mocks';
import { DataService } from '../../services/data.service';
import { VehicleLocalRepositoryImpl } from './vehicle-local.repository.impl';
import { Vehicle } from '../../../domain/models/vehicle.model';

describe('VehicleLocalRepositoryImpl (Infrastructure)', () => {
  let repository: VehicleLocalRepositoryImpl;

  const countVehicles = 5;
  const DataServiceMock = { getAllVehiclesLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            VehicleLocalRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(VehicleLocalRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllVehiclesLocal()', () => {
    const getAllSpy = DataServiceMock.getAllVehiclesLocal.mockReturnValue(of([]));
    repository.getAll(countVehicles).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countVehicles);
  });

  it('debe devolver el listado de vehículos como Observable', (done) => {
    DataServiceMock.getAllVehiclesLocal.mockReturnValue(of(VEHICLES_MOCK))
    repository.getAll(countVehicles).subscribe((vehicles: Vehicle[]) => {
      expect(vehicles).toEqual(VEHICLES_MOCK);
      done();
    });
  });
});
