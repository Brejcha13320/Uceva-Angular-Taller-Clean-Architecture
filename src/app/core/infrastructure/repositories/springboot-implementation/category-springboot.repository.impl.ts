import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryRepository } from "../../../domain/repositories/category.repository";
import { DataService } from "../../services/data.service";
import { Category } from "../../../domain/models/category.model";

/**
 * Implementación Spring Boot del repositorio de categorías.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link CategoryRepository}
 * - La fuente de datos HTTP del backend Spring Boot {@link DataService}
 *
 * Responsabilidades:
 * - Implementar el contrato definido por el dominio
 * - Delegar la obtención de datos remotos al backend Spring Boot
 *
 * ❗ Este repositorio NO contiene lógica de negocio.
 * ❗ No expone detalles de red o HTTP al dominio.
 *
 * @see {@link CategoryRepository}
 * @see {@link DataService}
 */
@Injectable()
export class CategorySpringBootRepositoryImpl extends CategoryRepository {

    /**
     * Datasource encargado de obtener los datos de categorías desde Spring Boot.
     *
     * @remarks
     * Se inyecta usando la función `inject()` de Angular.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de categorías desde el backend Spring Boot.
     *
     * @remarks
     * Este método cumple el contrato definido en {@link CategoryRepository#getAll}.
     *
     * @returns Observable que emite un arreglo de {@link Category}
     */
    getAll(): Observable<Category[]> {
        return this.dataService.getAllCategoriesSpringBoot();
    }

}
