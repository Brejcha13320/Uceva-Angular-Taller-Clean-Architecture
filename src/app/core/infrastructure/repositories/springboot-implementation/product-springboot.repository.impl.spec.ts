import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../../mocks/products.mocks';
import { Product } from '../../../domain/models/product.model';
import { DataService } from '../../services/data.service';
import { ProductSpringBootRepositoryImpl } from './product-springboot.repository.impl';

describe('ProductSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: ProductSpringBootRepositoryImpl;

  const countProducts = 5;
  const DataServiceMock = {  getAllProductsSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ProductSpringBootRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(ProductSpringBootRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllProductsSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllProductsSpringBoot.mockReturnValue(of([]));
    repository.getAll(countProducts).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countProducts);
  });

  it('debe devolver el listado de productos como Observable', (done) => {
    DataServiceMock.getAllProductsSpringBoot.mockReturnValue(of(PRODUCTS_MOCK))
    repository.getAll(countProducts).subscribe((products: Product[]) => {
      expect(products).toEqual(PRODUCTS_MOCK);
      done();
    });
  });
});
