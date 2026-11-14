import { Component, inject, OnInit } from '@angular/core';
import { GetAllBooksUseCase } from '../../../core/application/usecases/get-all-books.usecase';
import { Book } from '../../../core/domain/models/book.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { BooksTableComponent } from '../../components/books-table/books-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Componente contenedor de libros.
 *
 * Se utiliza para gestionar y mostrar un listado de libros
 * utilizando el componente `BooksTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el caso de uso `GetAllBooksUseCase`
 * para obtener los libros y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 */
@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  imports: [BooksTableComponent, AlertComponent],
  providers: [GetAllBooksUseCase]
})
export class BooksPage implements OnInit {
  /**
   * Listado de libros obtenidos desde el caso de uso.
   * @type {Book[]}
   */
  books: Book[] = [];

  /**
   * Estado actual del componente.
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Caso de Uso para obtener libros.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllBooksUseCase = inject(GetAllBooksUseCase);

  /**
   * Inicializa el componente y carga los libros.
   * @remarks
   * Se suscribe al método `execute()` del caso de uso y
   * asigna los datos recibidos a la propiedad `books`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllBooksUseCase.execute(10).subscribe({
      next: (books) => {
        this.books = books;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }
}
