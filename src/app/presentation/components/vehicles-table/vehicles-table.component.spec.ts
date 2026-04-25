import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VehiclesTableComponent } from './vehicles-table.component';
import { VEHICLES_MOCK } from '../../../mocks/vehicles.mocks';

describe('VehiclesTableComponent', () => {
  let component: VehiclesTableComponent;
  let fixture: ComponentFixture<VehiclesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesTableComponent);
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

  it('debería renderizar una fila por cada vehículo', () => {
    component.vehicles = VEHICLES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.vehicles.length);
  });

  it('debería mostrar los datos del vehículo en cada columna', () => {
    component.vehicles = VEHICLES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const vehicle = component.vehicles[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(vehicle.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(vehicle.brand);
      expect(columns[2].nativeElement.textContent.trim()).toBe(vehicle.category);
      expect(columns[3].nativeElement.textContent.trim()).toBe(String(vehicle.price));
      expect(columns[4].nativeElement.textContent.trim()).toBe(String(vehicle.year));
    });
  });

  it('debería mapear cada categoría a su BadgeType correcto', () => {
    expect(component.engineeringMap['Sedan']).toBe('success');
    expect(component.engineeringMap['SUV']).toBe('primary');
    expect(component.engineeringMap['Camioneta']).toBe('warning');
  });
  
});
