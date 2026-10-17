import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

/**
 * Caso de uso para obtener el listado completo de órdenes de compra.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todas las
 * órdenes disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `OrderRepository`.
 *
 * @remarks
 * - No conoce detalles de infraestructura.
 * - No transforma los datos para la interfaz de usuario.
 * - Propaga los resultados y errores al consumidor.
 *
 * La dependencia se resuelve mediante **inyección por contrato**
 * utilizando la función `inject()` de Angular.
 *
 * @example
 * ```ts
 * this.getAllOrdersUseCase.execute().subscribe(orders => {
 *   // manejo de órdenes
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see OrderModel
 * @see OrderRepository
 */
@Injectable()
export class GetAllOrdersUseCase {

  /**
   * Repositorio de órdenes inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private orderRepository = inject(OrderRepository);

  /**
   * Ejecuta el caso de uso para obtener las órdenes.
   *
   * @returns {Observable<OrderModel[]>}
   * Observable que emite el listado de órdenes de compra del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Cumple con el principio de responsabilidad única (SRP).
   */
  execute(): Observable<OrderModel[]> {
    return this.orderRepository.getAll();
  }
}
