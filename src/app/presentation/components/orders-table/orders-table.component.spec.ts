import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrdersTableComponent } from './orders-table.component';
import { ORDERS_MOCK } from '../../../mocks/orders.mocks';

describe('OrdersTableComponent', () => {
  let component: OrdersTableComponent;
  let fixture: ComponentFixture<OrdersTableComponent>;
  const currencyPipe = new CurrencyPipe('en-US');
  const datePipe = new DatePipe('en-US');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('debería renderizar una fila por cada pedido', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.orders.length);
  });

  it('debería mostrar los datos del pedido en cada columna', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const order = component.orders[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(order.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(order.customer);
      expect(columns[2].nativeElement.textContent.trim()).toBe(currencyPipe.transform(order.total));
      expect(columns[3].nativeElement.textContent.trim()).toBe(datePipe.transform(order.createdAt, 'dd/MM/yyyy'));
      expect(columns[4].nativeElement.textContent.trim()).toBe(order.status);
    });
  });

  it('debería mapear cada estado a su BadgeType correcto', () => {
    expect(component.statusMap['Pendiente']).toBe('warning');
    expect(component.statusMap['Enviado']).toBe('primary');
    expect(component.statusMap['Entregado']).toBe('success');
    expect(component.statusMap['Cancelado']).toBe('danger');
  });

});