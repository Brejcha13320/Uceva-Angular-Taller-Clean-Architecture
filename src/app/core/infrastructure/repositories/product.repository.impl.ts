import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../domain/models/product.model";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductService } from "../services/product.service";

/**
 * Implementación concreta del repositorio de productos.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link ProductRepository}
 * - La fuente de datos {@link ProductService}
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
 * @see {@link ProductService}
 */
@Injectable()
export class ProductRepositoryImpl extends ProductRepository {

    /**
     * Datasource encargado de obtener los datos de productos.
     *
     * @remarks
     * Se inyecta usando la función `inject()` de Angular
     * para evitar constructores explícitos y favorecer
     * un estilo más declarativo.
     */
    private productService = inject(ProductService);

    /**
     * Obtiene el listado completo de productos.
     *
     * @remarks
     * Este método cumple el contrato definido en
     * {@link ProductRepository#getAll}.
     *
     * Actualmente delega directamente la llamada al
     * {@link ProductService}, pero este es el lugar
     * adecuado para:
     * - Mapear DTOs a modelos de dominio
     * - Aplicar filtros o transformaciones
     * - Manejar errores o estrategias de caché
     *
     * @returns Observable que emite un arreglo de {@link Product}
     */
    getAll(): Observable<Product[]> {
        return this.productService.getAll();
    }

}
