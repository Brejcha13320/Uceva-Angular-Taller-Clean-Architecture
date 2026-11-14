import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllBooksUseCase } from '../../../core/application/usecases/get-all-books.usecase';
import { BOOKS_MOCK } from '../../../mocks/books.mocks';
import { BooksTableComponent } from '../../components/books-table/books-table.component';
import { BooksPage } from './books.page';

describe('BooksPage', () => {
  let component: BooksPage;
  let fixture: ComponentFixture<BooksPage>;

  const GetAllBooksUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPage, BooksTableComponent],
    })
    .overrideComponent(BooksPage, {
      set: {
        providers: [
          { provide: GetAllBooksUseCase, useValue: GetAllBooksUseCaseMock }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.books).toEqual([]);
  });

  it('debe cargar los libros y cambiar el estado a success', () => {
    GetAllBooksUseCaseMock.execute.mockReturnValue(of(BOOKS_MOCK));
    fixture.detectChanges();
    expect(component.books).toEqual(BOOKS_MOCK);
    expect(component.state).toBe('success');
  });

  it('no deberia cargar los libros y cambiar el estado a error', () => {
    GetAllBooksUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    expect(component.books).toEqual([]);
    expect(component.state).toBe('error');
  });

  it('debería solicitar 10 libros al ejecutar el caso de uso', () => {
    fixture.detectChanges(); // dispara ngOnInit
    expect(GetAllBooksUseCaseMock.execute).toHaveBeenCalledWith(10);
  });

});
