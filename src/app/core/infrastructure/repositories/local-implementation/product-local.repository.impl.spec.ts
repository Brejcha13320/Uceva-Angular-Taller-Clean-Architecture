import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../../mocks/products.mocks';
import { Product } from '../../../domain/models/product.model';
import { DataService } from '../../services/data.service';
import { ProductLocalRepositoryImpl } from './product-local.repository.impl';

describe('ProductLocalRepositoryImpl (Infrastructure)', () => {
  let repository: ProductLocalRepositoryImpl;

  const DataServiceMock = {  getAllProductsLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ProductLocalRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(ProductLocalRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllProductsLocal()', () => {
    const getAllSpy = DataServiceMock.getAllProductsLocal.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de productos como Observable', (done) => {
    DataServiceMock.getAllProductsLocal.mockReturnValue(of(PRODUCTS_MOCK))
    repository.getAll().subscribe((products: Product[]) => {
      expect(products).toEqual(PRODUCTS_MOCK);
      done();
    });
  });
});
