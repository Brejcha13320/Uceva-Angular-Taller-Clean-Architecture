import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DealershipsTableComponent } from './dealerships-table.component';
import { DEALERSHIPS_MOCK } from '../../../mocks/dealerships.mocks';

describe('DealershipsTableComponent', () => {
  let component: DealershipsTableComponent;
  let fixture: ComponentFixture<DealershipsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealershipsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealershipsTableComponent);
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

  it('debería renderizar una fila por cada concesionario', () => {
    component.dealerships = DEALERSHIPS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.dealerships.length);
  });

  it('debería mostrar los datos del concesionario en cada columna', () => {
    component.dealerships = DEALERSHIPS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const dealership = component.dealerships[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(dealership.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(dealership.name);
      expect(columns[2].nativeElement.textContent.trim()).toBe(dealership.location);
      expect(columns[3].nativeElement.textContent.trim()).toBe(dealership.continent);
    });
  });

  it('debería mapear cada categoría a su BadgeType correcto', () => {
    expect(component.continentType['America']).toBe('success');
    expect(component.continentType['Europe']).toBe('primary');
    expect(component.continentType['Asia']).toBe('warning');
    expect(component.continentType['Africa']).toBe('danger');
    expect(component.continentType['Oceania']).toBe('info');
  });

});
