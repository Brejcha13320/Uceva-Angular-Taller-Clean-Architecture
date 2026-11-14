import { TestBed } from "@angular/core/testing";
import { OrderLocalRepositoryImpl } from "./order-local.repository.impl";
import { DataService } from "../../services/data.service";
import { OrderRepository } from "../../../domain/repositories/order.repository";
import { of } from "rxjs";
import { Order } from "../../../domain/models/order.model";
import { ORDERS_MOCK } from '../../../../mocks/orders.mocks';

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

describe('OrderLocalRepositoryImpl (Infrastructure)', () => {
  let repository: OrderLocalRepositoryImpl;
  let dataServiceMock: jest.Mocked<DataService>;

  const countOrders = 5;
  const DataServiceMock = { getAllOrdersLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderLocalRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    });
    repository = TestBed.inject(OrderLocalRepositoryImpl);
    dataServiceMock = TestBed.inject(DataService) as jest.Mocked<DataService>;
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeInstanceOf(OrderLocalRepositoryImpl);
  });

  it('debe delegar la llamada a DataService.getAllOrdersLocal()', () => {
    dataServiceMock.getAllOrdersLocal.mockReturnValue(of([]));
    repository.getAll(countOrders).subscribe();
    expect(dataServiceMock.getAllOrdersLocal).toHaveBeenCalledTimes(1);
    expect(dataServiceMock.getAllOrdersLocal).toHaveBeenCalledWith(countOrders);
  });

  it('debe devolver el listado de pedidos como Observable', () => {
    dataServiceMock.getAllOrdersLocal.mockReturnValue(of(ORDERS_MOCK));
    let result: Order[] | undefined;
    repository.getAll(countOrders).subscribe((orders) => {
      result = orders;
    });
    expect(result).toEqual(ORDERS_MOCK);
  });

});