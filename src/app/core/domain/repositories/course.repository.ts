import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

/**
 * Contrato del repositorio de cursos.
 *
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `Course` dentro del dominio.
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
 * constructor(private courseRepository: CourseRepository) {}
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see Course
 */
export abstract class CourseRepository {

  /**
   * Obtiene el listado completo de cursos.
   *
   * @param {number} countCourses - Número de cursos a generar.
   * @returns {Observable<Course[]>}
   * Observable que emite un arreglo de cursos del dominio.
   *
   * @remarks
   * - No define la fuente de datos.
   * - No gestiona errores de presentación.
   * - Propaga los errores al consumidor.
   */
  abstract getAll(countCourses: number): Observable<Course[]>;
}