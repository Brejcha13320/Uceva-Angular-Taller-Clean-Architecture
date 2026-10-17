import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ORDERS_MOCK } from '../../../../mocks/orders.mocks';
import { OrderModel } from '../../../domain/models/order.model';
import { DataService } from '../../services/data.service';
import { OrderLocalRepositoryImpl } from './order-local.repository.impl';

describe('OrderLocalRepositoryImpl (Infrastructure)', () => {
  let repository: OrderLocalRepositoryImpl;

  const DataServiceMock = { getAllOrdersLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderLocalRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    }).compileComponents();
    repository = TestBed.inject(OrderLocalRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllOrdersLocal()', () => {
    const getAllSpy = DataServiceMock.getAllOrdersLocal.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de órdenes como Observable', (done) => {
    DataServiceMock.getAllOrdersLocal.mockReturnValue(of(ORDERS_MOCK));
    repository.getAll().subscribe((orders: OrderModel[]) => {
      expect(orders).toEqual(ORDERS_MOCK);
      done();
    });
  });
});
