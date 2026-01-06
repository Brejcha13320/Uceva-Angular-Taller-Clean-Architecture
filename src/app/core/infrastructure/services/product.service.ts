import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { PRODUCTS_MOCK } from "../../../mocks/products.mocks";
import { Product } from "../../domain/models/product.model";

/**
 * Servicio de infraestructura encargado de obtener datos de productos.
 *
 * @remarks
 * Este servicio actúa como un **Data Source** dentro de la capa
 * de *Infrastructure* de Clean Architecture.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No implementa repositorios del dominio.
 *
 * Su responsabilidad es:
 * - Obtener datos desde una fuente externa (API, mocks, storage, etc.)
 * - Devolverlos en el formato recibido
 *
 * La transformación de datos y reglas de negocio
 * deben realizarse en el `ProductRepositoryImpl`.
 *
 * @example
 * ```ts
 * this.productService.getAll().subscribe(products => {
 *   console.log(products);
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ProductService {

    /**
     * Obtiene el listado completo de productos.
     *
     * @remarks
     * Actualmente retorna datos simulados (`PRODUCTS_MOCK`).
     * En un entorno real, este método podría realizar
     * una petición HTTP usando `HttpClient`.
     *
     * @returns Observable que emite un arreglo de {@link Product}
     */
    getAll(): Observable<Product[]> {
        return of(PRODUCTS_MOCK);
    }

}
