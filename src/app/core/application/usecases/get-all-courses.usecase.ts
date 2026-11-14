import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../domain/models/course.model';
import { CourseRepository } from '../../domain/repositories/course.repository';

/**
 * Caso de uso para obtener el listado completo de cursos.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todos los
 * cursos disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `CourseRepository`.
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
 * this.getAllCoursesUseCase.execute(countCourses).subscribe(cursos => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Course
 * @see CourseRepository
 */
@Injectable()
export class GetAllCoursesUseCase {

  /**
   * Repositorio de cursos inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private courseRepository = inject(CourseRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param {number} countCourses - Número de cursos a obtener.
   * @returns {Observable<Course[]>}
   * Observable que emite el listado completo de cursos del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Mantiene el principio de responsabilidad única.
   */
  execute(countCourses: number): Observable<Course[]> {
    return this.courseRepository.getAll(countCourses);
  }
}