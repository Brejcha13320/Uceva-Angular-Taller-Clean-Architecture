import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryRepository } from "../../../domain/repositories/category.repository";
import { DataService } from "../../services/data.service";
import { Category } from "../../../domain/models/category.model";

/**
 * Implementación Node.js del repositorio de categorías.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link CategoryRepository}
 * - La fuente de datos HTTP del backend Node.js {@link DataService}
 *
 * Responsabilidades:
 * - Implementar el contrato definido por el dominio
 * - Delegar la obtención de datos remotos al backend Node.js
 *
 * ❗ Este repositorio NO contiene lógica de negocio.
 * ❗ No expone detalles de red o HTTP al dominio.
 *
 * @see {@link CategoryRepository}
 * @see {@link DataService}
 */
@Injectable()
export class CategoryNodeRepositoryImpl extends CategoryRepository {

    /**
     * Datasource encargado de obtener los datos de categorías desde Node.js.
     *
     * @remarks
     * Se inyecta usando la función `inject()` de Angular.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de categorías desde el backend Node.js.
     *
     * @remarks
     * Este método cumple el contrato definido en {@link CategoryRepository#getAll}.
     *
     * @returns Observable que emite un arreglo de {@link Category}
     */
    getAll(): Observable<Category[]> {
        return this.dataService.getAllCategoriesNode();
    }

}
