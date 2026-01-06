import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductRepository } from "../../../domain/repositories/product.repository";
import { DataService } from "../../services/data.service";
import { Product } from "../../../domain/models/product.model";

/**
 * Implementación concreta del repositorio de productos.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link ProductRepository}
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
 * @see {@link ProductRepository}
 * @see {@link DataService}
 */
@Injectable()
export class ProductNodeRepositoryImpl extends ProductRepository {

    /**
     * Datasource encargado de obtener los datos de productos.
     *
     * @remarks
     * Se inyecta usando la función `inject()` de Angular
     * para evitar constructores explícitos y favorecer
     * un estilo más declarativo.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de productos.
     *
     * @remarks
     * Este método cumple el contrato definido en
     * {@link ProductRepository#getAll}.
     *
     * Actualmente delega directamente la llamada al
     * {@link DataService}, pero este es el lugar
     * adecuado para:
     * - Mapear DTOs a modelos de dominio
     * - Aplicar filtros o transformaciones
     * - Manejar errores o estrategias de caché
     *
     * @returns Observable que emite un arreglo de {@link Product}
     */
    getAll(): Observable<Product[]> {
        return this.dataService.getAllProductsNode();
    }

}
