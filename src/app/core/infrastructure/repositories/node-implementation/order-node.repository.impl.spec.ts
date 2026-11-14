import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ORDERS_MOCK } from '../../../../mocks/orders.mocks';
import { Order } from '../../../domain/models/order.model';
import { DataService } from '../../services/data.service';
import { OrderNodeRepositoryImpl } from './order-node.repository.impl';

jest.mock('@faker-js/faker', () => ({
  faker: {
    person: {
      fullName: jest.fn(() => 'Test Customer'),
    },
    number: {
      int: jest.fn(() => 30),
    },
    date: {
      recent: jest.fn(() => new Date('2026-01-15T10:00:00.000Z')),
    },
    helpers: {
      arrayElement: jest.fn((arr) => arr[0]),
    },
  },
}));

describe('OrderNodeRepositoryImpl (Infrastructure)', () => {
  let repository: OrderNodeRepositoryImpl;

  const countOrders = 5;
  const DataServiceMock = { getAllOrdersNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderNodeRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    })
    .compileComponents();
    repository = TestBed.inject(OrderNodeRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllOrdersNode()', () => {
    const getAllSpy = DataServiceMock.getAllOrdersNode.mockReturnValue(of([]));
    repository.getAll(countOrders).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countOrders);
  });

  it('debe devolver el listado de pedidos como Observable', (done) => {
    DataServiceMock.getAllOrdersNode.mockReturnValue(of(ORDERS_MOCK));
    repository.getAll(countOrders).subscribe((orders: Order[]) => {
      expect(orders).toEqual(ORDERS_MOCK);
      done();
    });
  });

});