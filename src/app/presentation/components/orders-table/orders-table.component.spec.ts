import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ORDERS_MOCK } from '../../../mocks/orders.mocks';
import { OrdersTableComponent } from './orders-table.component';

describe('OrdersTableComponent', () => {
  let component: OrdersTableComponent;
  let fixture: ComponentFixture<OrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersTableComponent],
    }).compileComponents();

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

  it('debería renderizar una fila por cada orden', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.orders.length);
  });

  it('debería mostrar los datos de la orden en cada columna', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const order = component.orders[index];
      const orderTotal = new CurrencyPipe('en-US').transform(order.total);

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(order.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(order.orderNumber);
      expect(columns[2].nativeElement.textContent.trim()).toBe(order.customerName);
      expect(columns[3].nativeElement.textContent.trim()).toBe(orderTotal);
      expect(columns[4].nativeElement.textContent.trim()).toBe(order.status);
    });
  });

  it('debería mapear cada estado a su BadgeType correcto', () => {
    expect(component.statusMap['COMPLETED']).toBe('success');
    expect(component.statusMap['PROCESSING']).toBe('primary');
    expect(component.statusMap['PENDING']).toBe('warning');
    expect(component.statusMap['DELIVERED']).toBe('secondary');
    expect(component.statusMap['CANCELLED']).toBe('danger');
  });
});
