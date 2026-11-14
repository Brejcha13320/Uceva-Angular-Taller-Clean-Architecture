import { Component, inject, OnInit } from '@angular/core';
import { GetAllCoursesUseCase } from '../../../core/application/usecases/get-all-courses.usecase';
import { Course } from '../../../core/domain/models/course.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { CoursesTableComponent } from '../../components/courses-table/courses-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Componente contenedor de cursos.
 *
 * Se utiliza para gestionar y mostrar un listado de cursos
 * utilizando el componente `CoursesTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el caso de uso `GetAllCoursesUseCase`
 * para obtener los cursos y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 */
@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  imports: [CoursesTableComponent, AlertComponent],
  providers: [GetAllCoursesUseCase]
})
export class CoursesPage implements OnInit {
  /**
   * Listado de cursos obtenidos desde el caso de uso.
   * @type {Course[]}
   */
  courses: Course[] = [];

  /**
   * Estado actual del componente.
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Caso de Uso para obtener cursos.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllCoursesUseCase = inject(GetAllCoursesUseCase);

  /**
   * Inicializa el componente y carga los cursos.
   * @remarks
   * Se suscribe al método `execute()` del caso de uso y
   * asigna los datos recibidos a la propiedad `courses`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllCoursesUseCase.execute(10).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }
}
