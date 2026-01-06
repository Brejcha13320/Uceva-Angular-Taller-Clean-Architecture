import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { USERS_MOCK } from "../../../mocks/users.mocks";
import { User } from "../../domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user.repository";

/**
 * Implementación concreta del repositorio de usuarios.
 *
 * @description
 * Esta clase pertenece a la **capa de infraestructura** y actúa como
 * implementación del contrato `UserRepository`.
 *
 * Se encarga de proporcionar los datos de usuarios a la aplicación.
 * En este caso, utiliza una fuente de datos mock (`USERS_MOCK`) para
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
 * dependencias como proveedor del `UserRepository`.
 *
 * @example
 * ```ts
 * providers: [
 *   { provide: UserRepository, useClass: UserService }
 * ]
 * ```
 *
 * @see UserRepository
 * @see User
 */
@Injectable()
export class UserService extends UserRepository {

    /**
     * Obtiene el listado completo de usuarios.
     *
     * @returns {Observable<User[]>}
     * Observable que emite un arreglo de usuarios.
     *
     * @remarks
     * Actualmente retorna datos simulados desde `USERS_MOCK`.
     * Puede ser reemplazado por una llamada HTTP u otra fuente de datos.
     */
    getAll(): Observable<User[]> {
        return of(USERS_MOCK);
    }

}