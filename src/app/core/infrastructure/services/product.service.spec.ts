import { ProductService } from './product.service';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { Product } from '../../domain/models/product.model';

describe('ProductService (Infrastructure)', () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe devolver el listado de usuarios como Observable', (done) => {
    service.getAll().subscribe((products: Product[]) => {
      expect(products).toEqual(PRODUCTS_MOCK);
      done();
    });
  });

  it('debe devolver un array no vacío', (done) => {
    service.getAll().subscribe((products) => {
      expect(products.length).toBeGreaterThan(0);
      done();
    });
  });
});
