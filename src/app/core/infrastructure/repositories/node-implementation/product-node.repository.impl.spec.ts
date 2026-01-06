import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../../mocks/products.mocks';
import { Product } from '../../../domain/models/product.model';
import { DataService } from '../../services/data.service';
import { ProductNodeRepositoryImpl } from './product-node.repository.impl';

describe('ProductNodeRepositoryImpl (Infrastructure)', () => {
  let repository: ProductNodeRepositoryImpl;

  const DataServiceMock = {  getAllProductsNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ProductNodeRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(ProductNodeRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllProductsNode()', () => {
    const getAllSpy = DataServiceMock.getAllProductsNode.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de productos como Observable', (done) => {
    DataServiceMock.getAllProductsNode.mockReturnValue(of(PRODUCTS_MOCK))
    repository.getAll().subscribe((products: Product[]) => {
      expect(products).toEqual(PRODUCTS_MOCK);
      done();
    });
  });
});
