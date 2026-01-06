import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllProductsUseCase } from '../../../core/application/usecases/get-all-products.usecase';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';
import { ProductsPage } from './products.page';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;

  const GetAllProductsUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPage, ProductsTableComponent],
    })
    .overrideComponent(ProductsPage, {
      set: {
        providers: [
          { provide: GetAllProductsUseCase, useValue:GetAllProductsUseCaseMock }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.products).toEqual([]);
  });

  it('debe cargar los productos y cambiar el estado a success', () => {
    GetAllProductsUseCaseMock.execute.mockReturnValue(of(PRODUCTS_MOCK));
    fixture.detectChanges();
    expect(component.products).toEqual(PRODUCTS_MOCK);
    expect(component.state).toBe('success');
  });

  it('no deberia cargar los productos y cambiar el estado a error', () => {
    GetAllProductsUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    expect(component.products).toEqual([]);
    expect(component.state).toBe('error');
  });

});
