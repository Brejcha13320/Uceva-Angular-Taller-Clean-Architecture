import { Observable } from 'rxjs';
import { User } from '../models/user.model';

/**
 * Contrato del repositorio de usuarios.
 *
 * @description
 * Define el contrato de acceso a datos para la entidad `User`
 * dentro de la **capa de dominio**, siguiendo los principios de
 * Clean Architecture.
 *
 * Permite desacoplar la lógica de negocio de los detalles de
 * implementación de la infraestructura.
 *
 * @remarks
 * Las implementaciones pueden variar (API REST, GraphQL,
 * almacenamiento local, mocks, etc.) sin afectar a los casos de uso.
 *
 * @example
 * ```ts
 * // Inyección por contrato
 * constructor(private userRepository: UserRepository) {}
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see User
 */
export abstract class UserRepository {

  /**
   * Obtiene el listado completo de usuarios.
   *
   * @returns {Observable<User[]>}
   * Observable que emite un arreglo de usuarios del dominio.
   *
   * @remarks
   * - No conoce la fuente de datos.
   * - No transforma entidades de presentación.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  abstract getAll(countUsers: number): Observable<User[]>;
}
