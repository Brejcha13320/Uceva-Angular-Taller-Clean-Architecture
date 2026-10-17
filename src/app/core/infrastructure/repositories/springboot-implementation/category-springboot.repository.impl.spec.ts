import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CATEGORIES_MOCK } from '../../../../mocks/categories.mocks';
import { Category } from '../../../domain/models/category.model';
import { DataService } from '../../services/data.service';
import { CategorySpringBootRepositoryImpl } from './category-springboot.repository.impl';

jest.mock('@faker-js/faker', () => ({
  faker: {
    commerce: { productName: jest.fn(), price: jest.fn() },
    person: { firstName: jest.fn(), lastName: jest.fn() },
    number: { int: jest.fn() },
    internet: { email: jest.fn() },
    helpers: { arrayElement: jest.fn() },
  },
}));

describe('CategorySpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: CategorySpringBootRepositoryImpl;

  const DataServiceMock = { getAllCategoriesSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategorySpringBootRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    })
    .compileComponents();
    repository = TestBed.inject(CategorySpringBootRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllCategoriesSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllCategoriesSpringBoot.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de categorías como Observable', (done) => {
    DataServiceMock.getAllCategoriesSpringBoot.mockReturnValue(of(CATEGORIES_MOCK));
    repository.getAll().subscribe((categories: Category[]) => {
      expect(categories).toEqual(CATEGORIES_MOCK);
      done();
    });
  });
});
