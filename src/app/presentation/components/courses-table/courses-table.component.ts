import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Course, CourseFaculty } from '../../../core/domain/models/course.model';

/**
 * Componente de tabla de cursos.
 *
 * Se utiliza para mostrar un listado de cursos en una tabla,
 * mostrando información como id, nombre, créditos, docente y un badge
 * visual que indica la facultad de cada curso.
 *
 * @remarks
 * Este componente recibe los cursos desde un componente padre
 * a través del Input `courses` y utiliza el mapeo `facultyMap`
 * para asignar colores a los badges según la facultad.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-courses-table [courses]="coursesList"></app-courses-table>
 * ```
 */
@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  imports: [CommonModule, BadgeAtom],
})
export class CoursesTableComponent {
  /**
   * Listado de cursos que se mostrarán en la tabla.
   * @type {Course[]}
   * @remarks
   * Este Input permite pasar un array de cursos desde un componente padre.
   * Cada curso debe cumplir la interfaz `Course`.
   */
  @Input() courses: Course[] = [];

  /**
   * Mapeo de facultades de cursos a tipos de Badge.
   * @type {Record<CourseFaculty, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada facultad:
   * - 'Ingenieria' → 'primary'
   * - 'Ciencias' → 'success'
   * - 'Administracion' → 'warning'
   * - 'Derecho' → 'danger'
   *
   * Esto permite que en la tabla cada curso tenga un badge visual que indique su facultad.
   */
  facultyMap: Record<CourseFaculty, BadgeType> = {
    'Ingenieria': 'primary',
    'Ciencias': 'success',
    'Administracion': 'warning',
    'Derecho': 'danger',
  };
}
