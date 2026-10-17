import { Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';

/**
 * Contrato del repositorio de órdenes de compra.
 *
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `OrderModel` dentro del dominio.
 *
 * Forma parte de la **capa de dominio** y establece las operaciones
 * que cualquier implementación concreta debe cumplir, sin exponer
 * detalles de infraestructura (HTTP, base de datos, mocks, etc.).
 *
 * @remarks
 * Las implementaciones concretas de este repositorio residen
 * en la capa de infraestructura y son completamente intercambiables.
 *
 * @example
 * ```ts
 * // Inyección de dependencia por contrato
 * constructor(private orderRepository: OrderRepository) {}
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see OrderModel
 */
export abstract class OrderRepository {

  /**
   * Obtiene el listado completo de órdenes de compra.
   *
   * @returns {Observable<OrderModel[]>}
   * Observable que emite un arreglo de órdenes del dominio.
   *
   * @remarks
   * - No define la fuente de datos subyacente.
   * - No gestiona errores de presentación.
   * - Propaga los errores al caso de uso consumidor.
   */
  abstract getAll(): Observable<OrderModel[]>;
}
