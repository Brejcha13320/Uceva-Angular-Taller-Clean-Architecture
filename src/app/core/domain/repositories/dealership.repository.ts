import { Observable } from "rxjs";
import { Dealership } from "../models/dealership.model";
/**
 * Contrato del repositorio de concesionarios.
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `Dealership` dentro del dominio.
 * Forma parte de la **capa de dominio** y establece las operaciones
 * que cualquier implementación concreta debe cumplir, sin exponer
 * detalles de infraestructura (HTTP, base de datos, mocks, etc.).
 * @remarks
 * Las implementaciones concretas de este repositorio pueden residir
 * en la capa de infraestructura y ser intercambiables sin afectar
 * al resto del sistema.
 * @example
 * ```ts
 * // Inyección de dependencia por contrato
 * constructor(private dealershipRepository: DealershipRepository) {}
 * ```
 * @architecture Clean Architecture
 * @layer Domain
 * @see Dealership
 */
export abstract class DealershipRepository {
  /**
   * Obtiene el listado completo de concesionarios.
   * @returns {Observable<Dealership[]>}
   * Observable que emite un arreglo de concesionarios del dominio.
   * @remarks
   * - No define la fuente de datos.
   * - No gestiona errores de presentación.
   * - Propaga los errores al consumidor.
   */
  abstract getAll(countVehicles: number): Observable<Dealership[]>;
}
