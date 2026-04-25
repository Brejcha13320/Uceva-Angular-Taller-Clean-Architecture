import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../../domain/models/vehicle.model';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';

/**
 * Caso de uso para obtener el listado completo de vehículos.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todos los
 * vehículos disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `VehicleRepository`.
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
 * this.getAllProductsUseCase.execute().subscribe(products => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Vehicle
 * @see VehicleRepository
 */
@Injectable()
export class GetAllVehiclesUseCase {

  /**
   * Repositorio de vehículos inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private vehicleRepository = inject(VehicleRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @returns {Observable<Vehicle[]>}
   * Observable que emite el listado completo de vehículos del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Mantiene el principio de responsabilidad única.
   */
  execute(countVehicles: number): Observable<Vehicle[]> {
    return this.vehicleRepository.getAll(countVehicles);
  }
}