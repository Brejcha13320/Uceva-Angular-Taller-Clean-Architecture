import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DealershipsPage } from './dealerships.page';
import { GetAllDealershipsUseCase } from '../../../core/application/usecases/get-all-dealership.usecase';
import { DEALERSHIPS_MOCK } from '../../../mocks/dealerships.mocks';
import { DealershipsTableComponent } from '../../components/dealerships-table/dealerships-table.component';

describe('DealershipsPage', () => {
  let component: DealershipsPage;
  let fixture: ComponentFixture<DealershipsPage>;

  const GetAllDealershipsUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealershipsPage, DealershipsTableComponent],
    })
    .overrideComponent(DealershipsPage, {
      set: {
        providers: [
          { provide: GetAllDealershipsUseCase, useValue: GetAllDealershipsUseCaseMock }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealershipsPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.dealerships).toEqual([]);
  });

  it('debe cargar los conseccionarios y cambiar el estado a success', () => {
    GetAllDealershipsUseCaseMock.execute.mockReturnValue(of(DEALERSHIPS_MOCK));
    fixture.detectChanges();
    expect(component.dealerships).toEqual(DEALERSHIPS_MOCK);
    expect(component.state).toBe('success');
  });

  it('no deberia cargar los conseccionarios y cambiar el estado a error', () => {
    GetAllDealershipsUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    expect(component.dealerships).toEqual([]);
    expect(component.state).toBe('error');
  });

});
