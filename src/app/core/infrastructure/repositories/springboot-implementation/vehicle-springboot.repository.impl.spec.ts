
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VEHICLES_MOCK } from '../../../../mocks/vehicles.mocks';
import { DataService } from '../../services/data.service';
import { VehicleSpringBootRepositoryImpl } from './vehicle-springboot.repository.impl';
import { Vehicle } from '../../../domain/models/vehicle.model';

describe('VehicleSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: VehicleSpringBootRepositoryImpl;

  const countVehicles = 5;
  const DataServiceMock = { getAllVehiclesSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            VehicleSpringBootRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(VehicleSpringBootRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllVehiclesSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllVehiclesSpringBoot.mockReturnValue(of([]));
    repository.getAll(countVehicles).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countVehicles);
  });

  it('debe devolver el listado de vehículos como Observable', (done) => {
    DataServiceMock.getAllVehiclesSpringBoot.mockReturnValue(of(VEHICLES_MOCK))
    repository.getAll(countVehicles).subscribe((vehicles: Vehicle[]) => {
      expect(vehicles).toEqual(VEHICLES_MOCK);
      done();
    });
  });
});
