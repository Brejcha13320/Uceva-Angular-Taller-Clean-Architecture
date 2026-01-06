import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { PRODUCTS_MOCK } from "../../../mocks/products.mocks";
import { USERS_MOCK } from "../../../mocks/users.mocks";
import { Product } from "../../domain/models/product.model";
import { User } from "../../domain/models/user.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

/**
 * Servicio de infraestructura para obtención de datos.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa
 * como un **Data Source** que provee información desde
 * diferentes orígenes:
 *
 * - Datos locales simulados (mocks)
 * - Backend Node.js mediante HTTP
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser consumido directamente por los casos de uso.
 *
 * Es utilizado por repositorios o servicios de infraestructura
 * que adaptan los datos al dominio.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
    /**
     * Cliente HTTP de Angular.
     *
     * @remarks
     * Se inyecta mediante la API `inject()` de Angular
     * para evitar el uso de constructores explícitos.
     */
    private httpClient = inject(HttpClient);
    /**
     * URL base del backend Node.js.
     *
     * @remarks
     * Se construye a partir de la configuración de entorno
     * definida en `environment`.
     */
    private nodeUrl = `${environment.baseUrlNode}/api`;


    /**
     * Obtiene el listado de USUARIOS desde datos locales simulados.
     *
     * @remarks
     * Devuelve información mockeada definida en `USERS_MOCK`.
     *
     * @returns Observable que emite un arreglo de {@link User}
     */
    getAllUsersLocal(): Observable<User[]> {
        return of(USERS_MOCK);
    }


    /**
     * Obtiene el listado de productos desde datos locales simulados.
     *
     * @remarks
     * Devuelve información mockeada definida en `PRODUCTS_MOCK`.
     *
     * @returns Observable que emite un arreglo de {@link Product}
     */
    getAllProductsLocal(): Observable<Product[]> {
        return of(PRODUCTS_MOCK);
    }

    /**
     * Obtiene el listado de usuarios desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/users/{countUsers}`.
     *
     * El número de usuarios a obtener se define
     * mediante el parámetro `countUsers`.
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link User}
     *
     * @example
     * ```ts
     * this.dataService.getAllUsersNode(10).subscribe(users => {
     *   console.log(users);
     * });
     * ```
     */
    getAllUsersNode(countUsers: number): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.nodeUrl}/users/${countUsers}`);
    }

    /**
     * Obtiene el listado de productos desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/products/{countProducts}`.
     *
     * @param countProducts - Cantidad de productos a solicitar
     * @returns Observable que emite un arreglo de {@link Product}
     *
     * @example
     * ```ts
     * this.dataService.getAllProductsNode(5).subscribe(products => {
     *   console.log(products);
     * });
     * ```
     */
    getAllProductsNode(countProducts: number): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.nodeUrl}/products/${countProducts}`);
    }

}