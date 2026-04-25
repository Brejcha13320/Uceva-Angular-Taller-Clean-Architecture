import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DealershipRepository } from '../../domain/repositories/dealership.repository';
import { Dealership } from '../../domain/models/dealership.model';

/**
 * Caso de uso para obtener el listado completo de conseccionarios.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todos los
 * conseccionarios disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `DealershipRepository`.
 *
 * @remarks
 * - No conoce detalles de infraestructura.
 * - No transforma los datos para la UI.
 * - Propaga los resultados y errores al consumidor.
 *
 * La dependencia se resuelve mediante **inyección por contrato**
 * utilizando la función `inject()` de Angular.
 *
 * @example
 * ```ts
 * this.getAllDealershipsUseCase.execute().subscribe(dealerships => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Dealership
 * @see DealershipRepository
 */
@Injectable()
export class GetAllDealershipsUseCase {

  /**
   * Repositorio de conseccionarios inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private dealershipRepository = inject(DealershipRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @returns {Observable<Dealership[]>}
   * Observable que emite el listado completo de conseccionarios del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Mantiene el principio de responsabilidad única.
   */
  execute(countVehicles: number): Observable<Dealership[]> {
    return this.dealershipRepository.getAll(countVehicles);
  }
}
