import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from '../../services/data.service';
import { DealershipSpringBootRepositoryImpl } from './dealership-springboot.repository.impl';
import { DEALERSHIPS_MOCK } from '../../../../mocks/dealerships.mocks';
import { Dealership } from '../../../domain/models/dealership.model';

describe('DealershipSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: DealershipSpringBootRepositoryImpl;

  const countDealerships = 5;
  const DataServiceMock = { getAllDealershipsSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            DealershipSpringBootRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(DealershipSpringBootRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllDealershipsSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllDealershipsSpringBoot.mockReturnValue(of([]));
    repository.getAll(countDealerships).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countDealerships);
  });

  it('debe devolver el listado de conseccionarios como Observable', (done) => {
    DataServiceMock.getAllDealershipsSpringBoot.mockReturnValue(of(DEALERSHIPS_MOCK))
    repository.getAll(countDealerships).subscribe((dealerships: Dealership[]) => {
      expect(dealerships).toEqual(DEALERSHIPS_MOCK);
      done();
    });
  });
});
