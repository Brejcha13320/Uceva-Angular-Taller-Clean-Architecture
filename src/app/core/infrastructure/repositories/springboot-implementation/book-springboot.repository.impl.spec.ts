import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BOOKS_MOCK } from '../../../../mocks/books.mocks';
import { Book } from '../../../domain/models/book.model';
import { DataService } from '../../services/data.service';
import { BookSpringBootRepositoryImpl } from './book-springboot.repository.impl';

describe('BookSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: BookSpringBootRepositoryImpl;

  const countBooks = 5;
  const DataServiceMock = { getAllBooksSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookSpringBootRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    })
    .compileComponents();
    repository = TestBed.inject(BookSpringBootRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllBooksSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllBooksSpringBoot.mockReturnValue(of([]));
    repository.getAll(countBooks).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countBooks);
  });

  it('debe devolver el listado de libros como Observable', (done) => {
    DataServiceMock.getAllBooksSpringBoot.mockReturnValue(of(BOOKS_MOCK));
    repository.getAll(countBooks).subscribe((books: Book[]) => {
      expect(books).toEqual(BOOKS_MOCK);
      done();
    });
  });

});
