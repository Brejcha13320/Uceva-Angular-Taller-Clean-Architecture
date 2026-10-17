import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllCategoriesUseCase } from '../../../core/application/usecases/get-all-categories.usecase';
import { CATEGORIES_MOCK } from '../../../mocks/categories.mocks';
import { CategoriesTableComponent } from '../../components/categories-table/categories-table.component';
import { CategoriesPage } from './categories.page';

describe('CategoriesPage', () => {
  let component: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;

  const GetAllCategoriesUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesPage, CategoriesTableComponent],
    })
    .overrideComponent(CategoriesPage, {
      set: {
        providers: [
          { provide: GetAllCategoriesUseCase, useValue: GetAllCategoriesUseCaseMock }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.categories).toEqual([]);
  });

  it('debe cargar las categorías y cambiar el estado a success', () => {
    GetAllCategoriesUseCaseMock.execute.mockReturnValue(of(CATEGORIES_MOCK));
    fixture.detectChanges();
    expect(component.categories).toEqual(CATEGORIES_MOCK);
    expect(component.state).toBe('success');
  });

  it('no debería cargar las categorías y cambiar el estado a error', () => {
    GetAllCategoriesUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    expect(component.categories).toEqual([]);
    expect(component.state).toBe('error');
  });

});
