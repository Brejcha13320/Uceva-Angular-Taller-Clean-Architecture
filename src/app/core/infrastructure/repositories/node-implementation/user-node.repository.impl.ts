import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { DataService } from "../../services/data.service";
import { User } from "../../../domain/models/user.model";

/**
 * Implementación concreta del repositorio de usuarios.
 *
 * @remarks
 * Forma parte de la **capa de Infrastructure** y cumple
 * el rol de **Adapter** entre el dominio y la fuente de datos.
 *
 * Implementa el contrato {@link UserRepository}
 * utilizando {@link DataService} como datasource.
 *
 * Este patrón permite:
 * - Desacoplar el dominio de detalles técnicos
 * - Sustituir la fuente de datos sin afectar casos de uso
 * - Facilitar pruebas unitarias mediante mocks
 *
 * @see {@link UserRepository}
 * @see {@link DataService}
 */
@Injectable()
export class UserNodeRepositoryImpl extends UserRepository {

    /**
     * Datasource encargado de obtener los datos de usuarios.
     *
     * @remarks
     * Se inyecta mediante la API `inject()` de Angular,
     * recomendada en arquitecturas modernas y código standalone.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de usuarios.
     *
     * @remarks
     * Implementa el método definido en
     * {@link UserRepository#getAll}.
     *
     * En este nivel se pueden realizar:
     * - Transformaciones de datos
     * - Manejo de errores
     * - Políticas de caché
     *
     * @returns Observable que emite un arreglo de {@link User}
     */
    getAll(): Observable<User[]> {
        return this.dataService.getAllUsersNode();
    }

}