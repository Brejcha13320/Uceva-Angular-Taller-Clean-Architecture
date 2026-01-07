import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso para obtener el listado completo de usuarios.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y encapsula
 * la acción de negocio encargada de recuperar todos los usuarios
 * del sistema.
 *
 * Desacopla la capa de presentación de los detalles de acceso a datos
 * mediante el contrato `UserRepository`.
 *
 * @remarks
 * - No depende de implementaciones concretas.
 * - No maneja estados de UI.
 * - Propaga errores al consumidor.
 *
 * @example
 * ```ts
 * this.getAllUsersUseCase.execute().subscribe(users => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see User
 * @see UserRepository
 */
@Injectable()
export class GetAllUsersUseCase {

  /**
   * Repositorio de usuarios inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private userRepository = inject(UserRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @returns {Observable<User[]>}
   * Observable que emite el listado completo de usuarios del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  execute(countUsers: number): Observable<User[]> {
    return this.userRepository.getAll(countUsers);
  }
}