import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

/**
 * Caso de uso para obtener el listado completo de pedidos.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todos los
 * pedidos disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `OrderRepository`.
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
 * this.getAllOrdersUseCase.execute(countOrders).subscribe(pedidos => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Order
 * @see OrderRepository
 */
@Injectable()
export class GetAllOrdersUseCase {

  /**
   * Repositorio de pedidos inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private orderRepository = inject(OrderRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param {number} countOrders - Número de pedidos a obtener.
   * @returns {Observable<Order[]>}
   * Observable que emite el listado completo de pedidos del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Mantiene el principio de responsabilidad única.
   */
  execute(countOrders: number): Observable<Order[]> {
    return this.orderRepository.getAll(countOrders);
  }
}