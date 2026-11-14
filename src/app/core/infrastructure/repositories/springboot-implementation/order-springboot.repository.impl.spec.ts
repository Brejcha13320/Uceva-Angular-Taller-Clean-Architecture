import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ORDERS_MOCK } from '../../../../mocks/orders.mocks';
import { Order } from '../../../domain/models/order.model';
import { DataService } from '../../services/data.service';
import { OrderSpringBootRepositoryImpl } from './order-springboot.repository.impl';

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

describe('OrderSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: OrderSpringBootRepositoryImpl;

  const countOrders = 5;
  const DataServiceMock = { getAllOrdersSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderSpringBootRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    })
    .compileComponents();
    repository = TestBed.inject(OrderSpringBootRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllOrdersSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllOrdersSpringBoot.mockReturnValue(of([]));
    repository.getAll(countOrders).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countOrders);
  });

  it('debe devolver el listado de pedidos como Observable', (done) => {
    DataServiceMock.getAllOrdersSpringBoot.mockReturnValue(of(ORDERS_MOCK));
    repository.getAll(countOrders).subscribe((orders: Order[]) => {
      expect(orders).toEqual(ORDERS_MOCK);
      done();
    });
  });

});