import { Injectable } from "@angular/core";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { Observable, of } from "rxjs";
import { Product } from "../../domain/models/product.model";
import { PRODUCTS_MOCK } from "../../../mocks/products.mocks";

/**
 * Implementación concreta del repositorio de productos.
 *
 * @description
 * Esta clase pertenece a la **capa de infraestructura** y actúa como
 * implementación del contrato `ProductRepository`.
 *
 * Se encarga de proporcionar los datos de productos a la aplicación.
 * En este caso, utiliza una fuente de datos mock (`PRODUCTS_MOCK`) para
 * simular la obtención de información, normalmente utilizada en
 * entornos de desarrollo o pruebas.
 *
 * @remarks
 * En una implementación real, esta clase podría comunicarse con:
 * - Un API REST
 * - Un backend GraphQL
 * - Una base de datos local
 *
 * Esta implementación se registra en el sistema de inyección de
 * dependencias como proveedor del `ProductRepository`.
 *
 * @example
 * ```ts
 * providers: [
 *   { provide: ProductRepository, useClass: ProductService }
 * ]
 * ```
 *
 * @see ProductRepository
 * @see Product
 */
@Injectable()
export class ProductService extends ProductRepository {

    /**
     * Obtiene el listado completo de productos.
     *
     * @returns {Observable<Product[]>}
     * Observable que emite un arreglo de productos.
     *
     * @remarks
     * Actualmente retorna datos simulados desde `PRODUCTS_MOCK`.
     * Puede ser reemplazado por una llamada HTTP u otra fuente de datos.
     */
    getAll(): Observable<Product[]> {
        return of(PRODUCTS_MOCK);
    }

}
