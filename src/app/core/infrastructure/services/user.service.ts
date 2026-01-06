import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { USERS_MOCK } from "../../../mocks/users.mocks";
import { User } from "../../domain/models/user.model";

/**
 * Servicio de infraestructura encargado de obtener datos de usuarios.
 *
 * @remarks
 * Forma parte de la capa de *Infrastructure* y funciona como
 * **fuente de datos (Data Source)**.
 *
 * Este servicio:
 * - No conoce reglas de negocio
 * - No depende de casos de uso
 * - No implementa contratos del dominio
 *
 * Es consumido por `UserRepositoryImpl`,
 * que se encarga de adaptar los datos al dominio.
 *
 * @example
 * ```ts
 * this.userService.getAll().subscribe(users => {
 *   console.log(users);
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class UserService {

    /**
     * Obtiene el listado completo de usuarios.
     *
     * @remarks
     * Actualmente devuelve datos mockeados (`USERS_MOCK`).
     * Este método puede evolucionar para consumir
     * una API REST, GraphQL o IndexedDB.
     *
     * @returns Observable que emite un arreglo de {@link User}
     */
    getAll(): Observable<User[]> {
        return of(USERS_MOCK);
    }

}