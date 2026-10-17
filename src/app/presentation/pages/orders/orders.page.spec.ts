import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllOrdersUseCase } from '../../../core/application/usecases/get-all-orders.usecase';
import { ORDERS_MOCK } from '../../../mocks/orders.mocks';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { OrdersPage } from './orders.page';

describe('OrdersPage', () => {
  let component: OrdersPage;
  let fixture: ComponentFixture<OrdersPage>;

  const GetAllOrdersUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersPage, OrdersTableComponent],
    })
      .overrideComponent(OrdersPage, {
        set: {
          providers: [
            { provide: GetAllOrdersUseCase, useValue: GetAllOrdersUseCaseMock }
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(OrdersPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente en su estado inicial', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.orders).toEqual([]);
  });

  it('debe cargar las órdenes y cambiar el estado a success', () => {
    GetAllOrdersUseCaseMock.execute.mockReturnValue(of(ORDERS_MOCK));
    fixture.detectChanges();
    expect(component.orders).toEqual(ORDERS_MOCK);
    expect(component.state).toBe('success');
  });

  it('no debería cargar las órdenes y cambiar el estado a error cuando falle el caso de uso', () => {
    GetAllOrdersUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('Error de conexión'))
    );
    fixture.detectChanges();
    expect(component.orders).toEqual([]);
    expect(component.state).toBe('error');
  });
});
