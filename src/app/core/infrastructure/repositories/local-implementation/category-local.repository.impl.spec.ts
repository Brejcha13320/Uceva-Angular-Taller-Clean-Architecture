import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CATEGORIES_MOCK } from '../../../../mocks/categories.mocks';
import { Category } from '../../../domain/models/category.model';
import { DataService } from '../../services/data.service';
import { CategoryLocalRepositoryImpl } from './category-local.repository.impl';

jest.mock('@faker-js/faker', () => ({
  faker: {
    commerce: { productName: jest.fn(), price: jest.fn() },
    person: { firstName: jest.fn(), lastName: jest.fn() },
    number: { int: jest.fn() },
    internet: { email: jest.fn() },
    helpers: { arrayElement: jest.fn() },
  },
}));

describe('CategoryLocalRepositoryImpl (Infrastructure)', () => {
  let repository: CategoryLocalRepositoryImpl;

  const DataServiceMock = { getAllCategoriesLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryLocalRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    })
    .compileComponents();
    repository = TestBed.inject(CategoryLocalRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllCategoriesLocal()', () => {
    const getAllSpy = DataServiceMock.getAllCategoriesLocal.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de categorías como Observable', (done) => {
    DataServiceMock.getAllCategoriesLocal.mockReturnValue(of(CATEGORIES_MOCK));
    repository.getAll().subscribe((categories: Category[]) => {
      expect(categories).toEqual(CATEGORIES_MOCK);
      done();
    });
  });
});
