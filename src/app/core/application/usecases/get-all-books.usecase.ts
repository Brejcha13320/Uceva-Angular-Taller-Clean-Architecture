import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../domain/models/book.model';
import { BookRepository } from '../../domain/repositories/book.repository';

/**
 * Caso de uso para obtener el listado completo de libros.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todos los
 * libros disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `BookRepository`.
 *
 * @remarks
 * - No conoce detalles de infraestructura.
 * - No transforma los datos para la UI.
 * - Propaga los resultados y errores al consumidor.
 *
 * La dependencia se resuelve mediante **inyección por contrato**
 * utilizando la función `inject()` de Angular.
 *
 * @example
 * ```ts
 * this.getAllBooksUseCase.execute(countBooks).subscribe(libros => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Book
 * @see BookRepository
 */
@Injectable()
export class GetAllBooksUseCase {

  /**
   * Repositorio de libros inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private bookRepository = inject(BookRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param {number} countBooks - Número de libros a obtener.
   * @returns {Observable<Book[]>}
   * Observable que emite el listado completo de libros del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Mantiene el principio de responsabilidad única.
   */
  execute(countBooks: number): Observable<Book[]> {
    return this.bookRepository.getAll(countBooks);
  }
}
