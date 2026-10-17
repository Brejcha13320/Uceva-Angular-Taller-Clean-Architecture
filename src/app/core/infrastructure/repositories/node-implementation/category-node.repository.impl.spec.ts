import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CATEGORIES_MOCK } from '../../../../mocks/categories.mocks';
import { Category } from '../../../domain/models/category.model';
import { DataService } from '../../services/data.service';
import { CategoryNodeRepositoryImpl } from './category-node.repository.impl';

jest.mock('@faker-js/faker', () => ({
  faker: {
    commerce: { productName: jest.fn(), price: jest.fn() },
    person: { firstName: jest.fn(), lastName: jest.fn() },
    number: { int: jest.fn() },
    internet: { email: jest.fn() },
    helpers: { arrayElement: jest.fn() },
  },
}));

describe('CategoryNodeRepositoryImpl (Infrastructure)', () => {
  let repository: CategoryNodeRepositoryImpl;

  const DataServiceMock = { getAllCategoriesNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryNodeRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    })
    .compileComponents();
    repository = TestBed.inject(CategoryNodeRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllCategoriesNode()', () => {
    const getAllSpy = DataServiceMock.getAllCategoriesNode.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de categorías como Observable', (done) => {
    DataServiceMock.getAllCategoriesNode.mockReturnValue(of(CATEGORIES_MOCK));
    repository.getAll().subscribe((categories: Category[]) => {
      expect(categories).toEqual(CATEGORIES_MOCK);
      done();
    });
  });
});
