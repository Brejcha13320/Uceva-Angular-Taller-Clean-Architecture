import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { Product } from '../../domain/models/product.model';
import { User } from '../../domain/models/user.model';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  
  const pathUrl = `${environment.baseUrlNode}/api`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones HTTP pendientes
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe devolver el listado de usuarios como Observable', (done) => {
    service.getAllUsersLocal().subscribe((users: User[]) => {
      expect(users).toEqual(USERS_MOCK);
      done();
    });
  });

  it('debe devolver el listado de productos como Observable', (done) => {
    service.getAllProductsLocal().subscribe((products: Product[]) => {
      expect(products).toEqual(PRODUCTS_MOCK);
      done();
    });
  });

  describe('getAllUsersNode', () => {

    it('debería realizar una petición GET y retornar una lista de usuarios', () => {
      const countUsers = 2;

      service.getAllUsersNode(countUsers).subscribe((usuarios) => {
        expect(usuarios).toEqual(USERS_MOCK);
        expect(usuarios.length).toBe(USERS_MOCK.length);
      });

      const req = httpMock.expectOne(`${pathUrl}/users/${countUsers}`);
      expect(req.request.method).toBe('GET');

      req.flush(USERS_MOCK);
    });

    it('debería propagar un error si la petición HTTP falla', () => {
      const countUsers = 2;

      service.getAllUsersNode(countUsers).subscribe({
        next: () => {
          fail('No debería emitir datos cuando ocurre un error');
        },
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(`${pathUrl}/users/${countUsers}`);

      req.flush(
        { message: 'Error interno del servidor' },
        { status: 500, statusText: 'Internal Server Error' }
      );
    });

  });

  describe('getAllProductsNode', () => {

    it('debería realizar una petición GET y retornar una lista de productos', () => {
      const countProducts = 2;

      service.getAllUsersNode(countProducts).subscribe((productos) => {
        expect(productos).toEqual(PRODUCTS_MOCK);
        expect(productos.length).toBe(PRODUCTS_MOCK.length);
      });

      const req = httpMock.expectOne(`${pathUrl}/users/${countProducts}`);
      expect(req.request.method).toBe('GET');

      req.flush(PRODUCTS_MOCK);
    });

    it('debería propagar un error si la petición HTTP falla', () => {
      const countProducts = 2;

      service.getAllUsersNode(countProducts).subscribe({
        next: () => {
          fail('No debería emitir datos cuando ocurre un error');
        },
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(`${pathUrl}/users/${countProducts}`);

      req.flush(
        { message: 'Error interno del servidor' },
        { status: 500, statusText: 'Internal Server Error' }
      );
    });

  });

});