import { TestBed } from "@angular/core/testing";
import { BookLocalRepositoryImpl } from "./book-local.repository.impl";
import { DataService } from "../../services/data.service";
import { BookRepository } from "../../../domain/repositories/book.repository";
import { of } from "rxjs";
import { Book } from "../../../domain/models/book.model";
import { BOOKS_MOCK } from '../../../../mocks/books.mocks';

describe('BookLocalRepositoryImpl (Infrastructure)', () => {
  let repository: BookLocalRepositoryImpl;
  let dataServiceMock: jest.Mocked<DataService>;

  const countBooks = 5;
  const DataServiceMock = { getAllBooksLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookLocalRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    });
    repository = TestBed.inject(BookLocalRepositoryImpl);
    dataServiceMock = TestBed.inject(DataService) as jest.Mocked<DataService>;
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeInstanceOf(BookLocalRepositoryImpl);
  });

  it('debe delegar la llamada a DataService.getAllBooksLocal()', () => {
    dataServiceMock.getAllBooksLocal.mockReturnValue(of([]));
    repository.getAll(countBooks).subscribe();
    expect(dataServiceMock.getAllBooksLocal).toHaveBeenCalledTimes(1);
    expect(dataServiceMock.getAllBooksLocal).toHaveBeenCalledWith(countBooks);
  });

  it('debe devolver el listado de libros como Observable', () => {
    dataServiceMock.getAllBooksLocal.mockReturnValue(of(BOOKS_MOCK));
    let result: Book[] | undefined;
    repository.getAll(countBooks).subscribe((books) => {
      result = books;
    });
    expect(result).toEqual(BOOKS_MOCK);
  });

});
