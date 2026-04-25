import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from '../../services/data.service';
import { DealershipNodeRepositoryImpl } from './dealership-node.repository.impl';
import { Dealership } from '../../../domain/models/dealership.model';

describe('DealershipNodeRepositoryImpl (Infrastructure)', () => {
  let repository: DealershipNodeRepositoryImpl;

  const countDealerships = 5;
  const DataServiceMock = { getAllDealershipsNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            DealershipNodeRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(DealershipNodeRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllDealershipsNode()', () => {
    const getAllSpy = DataServiceMock.getAllDealershipsNode.mockReturnValue(of([]));
    repository.getAll(countDealerships).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countDealerships);
  });

  it('debe devolver el listado de conseccionarios como Observable', (done) => {
    DataServiceMock.getAllDealershipsNode.mockReturnValue(of([]));
    repository.getAll(countDealerships).subscribe((dealerships: Dealership[]) => {
      expect(dealerships).toEqual([]);
      done();
    });
  });
});
