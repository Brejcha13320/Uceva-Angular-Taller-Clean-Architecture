import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BOOKS_MOCK } from '../../../../mocks/books.mocks';
import { Book } from '../../../domain/models/book.model';
import { DataService } from '../../services/data.service';
import { BookNodeRepositoryImpl } from './book-node.repository.impl';

describe('BookNodeRepositoryImpl (Infrastructure)', () => {
  let repository: BookNodeRepositoryImpl;

  const countBooks = 5;
  const DataServiceMock = { getAllBooksNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookNodeRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    })
    .compileComponents();
    repository = TestBed.inject(BookNodeRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllBooksNode()', () => {
    const getAllSpy = DataServiceMock.getAllBooksNode.mockReturnValue(of([]));
    repository.getAll(countBooks).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countBooks);
  });

  it('debe devolver el listado de libros como Observable', (done) => {
    DataServiceMock.getAllBooksNode.mockReturnValue(of(BOOKS_MOCK));
    repository.getAll(countBooks).subscribe((books: Book[]) => {
      expect(books).toEqual(BOOKS_MOCK);
      done();
    });
  });

});
