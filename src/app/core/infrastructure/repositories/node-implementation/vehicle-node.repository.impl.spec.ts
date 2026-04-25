
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VEHICLES_MOCK } from '../../../../mocks/vehicles.mocks';
import { DataService } from '../../services/data.service';
import { VehicleNodeRepositoryImpl } from './vehicle-node.repository.impl';
import { Vehicle } from '../../../domain/models/vehicle.model';

describe('VehicleNodeRepositoryImpl (Infrastructure)', () => {
  let repository: VehicleNodeRepositoryImpl;

  const countVehicles = 5;
  const DataServiceMock = { getAllVehiclesNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            VehicleNodeRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(VehicleNodeRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllVehiclesNode()', () => {
    const getAllSpy = DataServiceMock.getAllVehiclesNode.mockReturnValue(of([]));
    repository.getAll(countVehicles).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countVehicles);
  });

  it('debe devolver el listado de vehículos como Observable', (done) => {
    DataServiceMock.getAllVehiclesNode.mockReturnValue(of(VEHICLES_MOCK))
    repository.getAll(countVehicles).subscribe((vehicles: Vehicle[]) => {
      expect(vehicles).toEqual(VEHICLES_MOCK);
      done();
    });
  });
});
