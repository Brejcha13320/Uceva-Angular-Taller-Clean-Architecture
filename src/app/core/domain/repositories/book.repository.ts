import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

/**
 * Contrato del repositorio de libros.
 *
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `Book` dentro del dominio.
 *
 * Forma parte de la **capa de dominio** y establece las operaciones
 * que cualquier implementación concreta debe cumplir, sin exponer
 * detalles de infraestructura (HTTP, base de datos, mocks, etc.).
 *
 * @remarks
 * Las implementaciones concretas de este repositorio pueden residir
 * en la capa de infraestructura y ser intercambiables sin afectar
 * al resto del sistema.
 *
 * @example
 * ```ts
 * // Inyección de dependencia por contrato
 * constructor(private bookRepository: BookRepository) {}
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see Book
 */
export abstract class BookRepository {

  /**
   * Obtiene el listado completo de libros.
   *
   * @param {number} countBooks - Número de libros a generar.
   * @returns {Observable<Book[]>}
   * Observable que emite un arreglo de libros del dominio.
   *
   * @remarks
   * - No define la fuente de datos.
   * - No gestiona errores de presentación.
   * - Propaga los errores al consumidor.
   */
  abstract getAll(countBooks: number): Observable<Book[]>;
}
