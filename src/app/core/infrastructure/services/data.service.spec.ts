import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { Product } from '../../domain/models/product.model';
import { User } from '../../domain/models/user.model';
import { Course } from '../../domain/models/course.model';
import { Order } from '../../domain/models/order.model';
import { Book } from '../../domain/models/book.model';
import { DataService } from './data.service';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { COURSES_MOCK } from '../../../mocks/courses.mocks';
import { ORDERS_MOCK } from '../../../mocks/orders.mocks';
import { BOOKS_MOCK } from '../../../mocks/books.mocks';

jest.mock('@faker-js/faker/locale/en', () => ({
  faker: {
    commerce: {
      productName: jest.fn(() => 'Producto Test'),
      price: jest.fn(() => '10.00'),
    },
    person: {
      firstName: jest.fn(() => 'Juan'),
      lastName: jest.fn(() => 'Pérez'),
      fullName: jest.fn(() => 'Docente Test'),
    },
    number: {
      int: jest.fn(() => 30),
    },
    internet: {
      email: jest.fn(() => 'test@mail.com'),
    },
    date: {
      recent: jest.fn(() => new Date('2026-01-15T10:00:00.000Z')),
    },
    helpers: {
      arrayElement: jest.fn((arr) => arr[0]),
    },
  },
}));

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const countUsers = 5;
  const countProducts = 5;
  const countCourses = 5;
  const countOrders = 5;
  const countBooks = 5;
  const pathUrlNode = `${environment.baseUrlNode}/api`;
  const pathUrlSpringBoot = `${environment.baseUrlSpringBoot}/api`;

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
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  // --- Users locale ---
  it('debe devolver el listado de usuarios locale', (done) => {
    service.getAllUsersLocal(countUsers).subscribe((users: User[]) => {
      expect(users.length).toEqual(countUsers);
      done();
    });
  });

  // --- Products locale ---
  it('debe devolver el listado de productos locale', (done) => {
    service.getAllProductsLocal(countProducts).subscribe((products: Product[]) => {
      expect(products.length).toEqual(countProducts);
      done();
    });
  });

  // --- Users Node ---
  it('debe obtener usuarios desde Node por HTTP', () => {
    service.getAllUsersNode(countUsers).subscribe((users) => {
      expect(users).toEqual(USERS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlNode}/users/${countUsers}`);
    expect(req.request.method).toBe('GET');
    req.flush(USERS_MOCK);
  });

  // --- Products Node ---
  it('debe obtener productos desde Node por HTTP', () => {
    service.getAllProductsNode(countProducts).subscribe((products) => {
      expect(products).toEqual(PRODUCTS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlNode}/products/${countProducts}`);
    expect(req.request.method).toBe('GET');
    req.flush(PRODUCTS_MOCK);
  });

  // --- Users SpringBoot ---
  it('debe obtener usuarios desde SpringBoot por HTTP', () => {
    service.getAllUsersSpringBoot(countUsers).subscribe((users) => {
      expect(users).toEqual(USERS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlSpringBoot}/users/${countUsers}`);
    expect(req.request.method).toBe('GET');
    req.flush(USERS_MOCK);
  });

  // --- Products SpringBoot ---
  it('debe obtener productos desde SpringBoot por HTTP', () => {
    service.getAllProductsSpringBoot(countProducts).subscribe((products) => {
      expect(products).toEqual(PRODUCTS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlSpringBoot}/products/${countProducts}`);
    expect(req.request.method).toBe('GET');
    req.flush(PRODUCTS_MOCK);
  });

  // --- Courses locale ---
  it('debe devolver el listado de cursos locale', (done) => {
    service.getAllCoursesLocal(countCourses).subscribe((courses) => {
      expect(courses.length).toEqual(countCourses);
      courses.forEach((c) => {
        expect(c).toHaveProperty('id');
        expect(c).toHaveProperty('name');
        expect(c).toHaveProperty('credits');
        expect(c).toHaveProperty('teacher');
        expect(c).toHaveProperty('faculty');
      });
      done();
    });
  });

  // --- Courses Node ---
  it('debe obtener cursos desde Node por HTTP', () => {
    service.getAllCoursesNode(countCourses).subscribe((courses) => {
      expect(courses).toEqual(COURSES_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlNode}/courses/${countCourses}`);
    expect(req.request.method).toBe('GET');
    req.flush(COURSES_MOCK);
  });

  // --- Courses SpringBoot ---
  it('debe obtener cursos desde SpringBoot por HTTP', () => {
    service.getAllCoursesSpringBoot(countCourses).subscribe((courses) => {
      expect(courses).toEqual(COURSES_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlSpringBoot}/courses/${countCourses}`);
    expect(req.request.method).toBe('GET');
    req.flush(COURSES_MOCK);
  });

  // --- Orders locale ---
  it('debe devolver el listado de pedidos locale', (done) => {
    service.getAllOrdersLocal(countOrders).subscribe((orders) => {
      expect(orders.length).toEqual(countOrders);
      orders.forEach((o) => {
        expect(o).toHaveProperty('id');
        expect(o).toHaveProperty('customer');
        expect(o).toHaveProperty('total');
        expect(o).toHaveProperty('createdAt');
        expect(o).toHaveProperty('status');
      });
      done();
    });
  });

  // --- Orders Node ---
  it('debe obtener pedidos desde Node por HTTP', () => {
    service.getAllOrdersNode(countOrders).subscribe((orders) => {
      expect(orders).toEqual(ORDERS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlNode}/orders/${countOrders}`);
    expect(req.request.method).toBe('GET');
    req.flush(ORDERS_MOCK);
  });

  // --- Orders SpringBoot ---
  it('debe obtener pedidos desde SpringBoot por HTTP', () => {
    service.getAllOrdersSpringBoot(countOrders).subscribe((orders) => {
      expect(orders).toEqual(ORDERS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlSpringBoot}/orders/${countOrders}`);
    expect(req.request.method).toBe('GET');
    req.flush(ORDERS_MOCK);
  });

  // --- Books locale ---
  it('debe devolver el listado de libros locale', (done) => {
    service.getAllBooksLocal(countBooks).subscribe((books: Book[]) => {
      expect(books.length).toEqual(countBooks);
      books.forEach((b) => {
        expect(b).toHaveProperty('id');
        expect(b).toHaveProperty('title');
        expect(b).toHaveProperty('author');
        expect(b).toHaveProperty('year');
        expect(b).toHaveProperty('genre');
      });
      done();
    });
  });

  // --- Books Node ---
  it('debe obtener libros desde Node por HTTP', () => {
    service.getAllBooksNode(countBooks).subscribe((books) => {
      expect(books).toEqual(BOOKS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlNode}/books/${countBooks}`);
    expect(req.request.method).toBe('GET');
    req.flush(BOOKS_MOCK);
  });

  // --- Books SpringBoot ---
  it('debe obtener libros desde SpringBoot por HTTP', () => {
    service.getAllBooksSpringBoot(countBooks).subscribe((books) => {
      expect(books).toEqual(BOOKS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlSpringBoot}/books/${countBooks}`);
    expect(req.request.method).toBe('GET');
    req.flush(BOOKS_MOCK);
  });

});