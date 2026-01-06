import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { Product } from '../../domain/models/product.model';
import { ProductService } from '../services/product.service';
import { ProductRepositoryImpl } from './product.repository.impl';

describe('ProductRepositoryImpl (Infrastructure)', () => {
  let repository: ProductRepositoryImpl;

  const ProductServiceMock = { getAll: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ProductRepositoryImpl,
            { provide: ProductService, useValue: ProductServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(ProductRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a ProductService.getAll()', () => {
    const getAllSpy = ProductServiceMock.getAll.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de productos como Observable', (done) => {
    ProductServiceMock.getAll.mockReturnValue(of(PRODUCTS_MOCK))
    repository.getAll().subscribe((products: Product[]) => {
      expect(products).toEqual(PRODUCTS_MOCK);
      done();
    });
  });
});
