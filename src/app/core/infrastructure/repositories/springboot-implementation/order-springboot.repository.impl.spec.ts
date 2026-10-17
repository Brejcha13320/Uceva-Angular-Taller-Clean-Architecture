import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ORDERS_MOCK } from '../../../../mocks/orders.mocks';
import { OrderModel } from '../../../domain/models/order.model';
import { DataService } from '../../services/data.service';
import { OrderSpringBootRepositoryImpl } from './order-springboot.repository.impl';

describe('OrderSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: OrderSpringBootRepositoryImpl;

  const DataServiceMock = { getAllOrdersSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderSpringBootRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    }).compileComponents();
    repository = TestBed.inject(OrderSpringBootRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllOrdersSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllOrdersSpringBoot.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de órdenes como Observable', (done) => {
    DataServiceMock.getAllOrdersSpringBoot.mockReturnValue(of(ORDERS_MOCK));
    repository.getAll().subscribe((orders: OrderModel[]) => {
      expect(orders).toEqual(ORDERS_MOCK);
      done();
    });
  });
});
