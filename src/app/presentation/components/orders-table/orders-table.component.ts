import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { OrderModel, OrderStatus } from '../../../core/domain/models/order.model';

/**
 * Componente de tabla de órdenes de compra (Dumb Component).
 *
 * Se utiliza para presentar un listado visual de órdenes en una tabla,
 * exponiendo datos como identificador, número de orden, cliente, total
 * y un badge visual representativo del estado de la orden.
 *
 * @remarks
 * Este componente recibe las órdenes desde su componente contenedor
 * mediante el Input `orders` y asigna tipos de badges con `statusMap`.
 *
 * Forma parte de la capa de presentación de la aplicación.
 *
 * @example
 * ```html
 * <app-orders-table [orders]="ordersList"></app-orders-table>
 * ```
 */
@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  imports: [CommonModule, BadgeAtom],
})
export class OrdersTableComponent {
  /**
   * Listado de órdenes que se renderizan en la tabla.
   * @type {OrderModel[]}
   */
  @Input() orders: OrderModel[] = [];

  /**
   * Mapeo de estados de orden a variantes de Badge de Bootstrap.
   * @type {Record<OrderStatus, BadgeType>}
   * @remarks
   * Asocia cada estado de negocio con un color visual:
   * - 'COMPLETED' → 'success' (verde)
   * - 'PROCESSING' → 'primary' (azul)
   * - 'PENDING' → 'warning' (amarillo)
   * - 'DELIVERED' → 'secondary' (gris)
   * - 'CANCELLED' → 'danger' (rojo)
   */
  statusMap: Record<OrderStatus, BadgeType> = {
    'COMPLETED': 'success',
    'PROCESSING': 'primary',
    'PENDING': 'warning',
    'DELIVERED': 'secondary',
    'CANCELLED': 'danger',
  };
}
