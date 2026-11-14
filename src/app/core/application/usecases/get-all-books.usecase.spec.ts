import { TestBed } from "@angular/core/testing";
import { GetAllBooksUseCase } from "./get-all-books.usecase";
import { BookRepository } from "../../domain/repositories/book.repository";
import { firstValueFrom, of, throwError } from "rxjs";
import { BOOKS_MOCK } from "../../../mocks/books.mocks";


describe('GetAllBooksUseCase', () => {
  let useCase: GetAllBooksUseCase;

  const countBooks = 5;
  const BookRepositoryMock: jest.Mocked<BookRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetAllBooksUseCase,
            { provide: BookRepository, useValue: BookRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllBooksUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllBooksUseCase);
  });

  it('debería delegar la llamada del repository', async () => {
    BookRepositoryMock.getAll.mockReturnValue(of(BOOKS_MOCK));
    const result = await firstValueFrom(useCase.execute(countBooks));
    expect(BookRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(BookRepositoryMock.getAll).toHaveBeenCalledWith(countBooks);
    expect(result).toEqual(BOOKS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de libros';
    BookRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result = useCase.execute(countBooks);
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);
    expect(BookRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(BookRepositoryMock.getAll).toHaveBeenCalledWith(countBooks);
  });

});
