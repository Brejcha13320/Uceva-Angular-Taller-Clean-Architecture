import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CourseRepository } from "../../../domain/repositories/course.repository";
import { DataService } from "../../services/data.service";
import { Course } from "../../../domain/models/course.model";

/**
 * Implementación concreta del repositorio de cursos.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link CourseRepository}
 * - La fuente de datos {@link DataService}
 *
 * Responsabilidades:
 * - Implementar el contrato definido por el dominio
 * - Delegar la obtención de datos al datasource
 * - Adaptar, transformar o enriquecer los datos si es necesario
 *
 * ❗ Este repositorio NO contiene lógica de negocio.
 * ❗ No expone detalles de infraestructura al dominio.
 *
 * @see {@link CourseRepository}
 * @see {@link DataService}
 */
@Injectable()
export class CourseLocalRepositoryImpl extends CourseRepository {

    /**
     * Datasource encargado de obtener los datos de cursos.
     *
     * @remarks
     * Se inyecta usando la función `inject()` de Angular
     * para evitar constructores explícitos y favorecer
     * un estilo más declarativo.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de cursos.
     *
     * @remarks
     * Este método cumple el contrato definido en
     * {@link CourseRepository#getAll}.
     *
     * Actualmente delega directamente la llamada al
     * {@link DataService}, pero este es el lugar
     * adecuado para:
     * - Mapear DTOs a modelos de dominio
     * - Aplicar filtros o transformaciones
     * - Manejar errores o estrategias de caché
     *
     * @param countCourses - Cantidad de cursos a solicitar
     * @returns Observable que emite un arreglo de {@link Course}
     */
    getAll(countCourses: number): Observable<Course[]> {
        return this.dataService.getAllCoursesLocal(countCourses);
    }

}