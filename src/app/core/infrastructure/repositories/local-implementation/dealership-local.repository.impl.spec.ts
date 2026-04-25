import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from '../../services/data.service';
import { DealershipLocalRepositoryImpl } from './dealership-local.repository.impl';
import { DEALERSHIPS_MOCK } from '../../../../mocks/dealerships.mocks';
import { Dealership } from '../../../domain/models/dealership.model';

describe('DealershipLocalRepositoryImpl (Infrastructure)', () => {
  let repository: DealershipLocalRepositoryImpl;

  const countDealerships = 5;
  const DataServiceMock = { getAllDealershipsLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            DealershipLocalRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(DealershipLocalRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllDealershipsLocal()', () => {
    const getAllSpy = DataServiceMock.getAllDealershipsLocal.mockReturnValue(of([]));
    repository.getAll(countDealerships).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countDealerships);
  });

  it('debe devolver el listado de conseccionarios como Observable', (done) => {
    DataServiceMock.getAllDealershipsLocal.mockReturnValue(of(DEALERSHIPS_MOCK))
    repository.getAll(countDealerships).subscribe((dealerships: Dealership[]) => {
      expect(dealerships).toEqual(DEALERSHIPS_MOCK);
      done();
    });
  });
});
