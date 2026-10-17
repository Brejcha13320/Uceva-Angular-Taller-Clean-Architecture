import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ORDERS_MOCK } from '../../../../mocks/orders.mocks';
import { OrderModel } from '../../../domain/models/order.model';
import { DataService } from '../../services/data.service';
import { OrderNodeRepositoryImpl } from './order-node.repository.impl';

describe('OrderNodeRepositoryImpl (Infrastructure)', () => {
  let repository: OrderNodeRepositoryImpl;

  const DataServiceMock = { getAllOrdersNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderNodeRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    }).compileComponents();
    repository = TestBed.inject(OrderNodeRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllOrdersNode()', () => {
    const getAllSpy = DataServiceMock.getAllOrdersNode.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de órdenes como Observable', (done) => {
    DataServiceMock.getAllOrdersNode.mockReturnValue(of(ORDERS_MOCK));
    repository.getAll().subscribe((orders: OrderModel[]) => {
      expect(orders).toEqual(ORDERS_MOCK);
      done();
    });
  });
});
