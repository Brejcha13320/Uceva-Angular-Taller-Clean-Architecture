import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllUsersUseCase } from '../../../core/application/usecases/get-all-users.usecase';
import { VEHICLES_MOCK } from '../../../mocks/vehicles.mocks';
import { VehiclesPage } from './vehicles.page';
import { VehiclesTableComponent } from '../../components/vehicles-table/vehicles-table.component';
import { GetAllVehiclesUseCase } from '../../../core/application/usecases/get-all-vehicles.usecase';

describe('VehiclesPage', () => {
  let component: VehiclesPage;
  let fixture: ComponentFixture<VehiclesPage>;

  const GetAllVehiclesUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesPage, VehiclesTableComponent],
    })
    .overrideComponent(VehiclesPage, {
      set: {
        providers: [
          { provide: GetAllVehiclesUseCase, useValue: GetAllVehiclesUseCaseMock }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.vehicles).toEqual([]);
  });

  it('debe cargar los vehículos y cambiar el estado a success', () => {
    GetAllVehiclesUseCaseMock.execute.mockReturnValue(of(VEHICLES_MOCK));
    fixture.detectChanges();
    expect(component.vehicles).toEqual(VEHICLES_MOCK);
    expect(component.state).toBe('success');
  });

  it('no deberia cargar los vehículos y cambiar el estado a error', () => {
    GetAllVehiclesUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    expect(component.vehicles).toEqual([]);
    expect(component.state).toBe('error');
  });

});
