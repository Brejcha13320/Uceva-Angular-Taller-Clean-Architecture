/**
 * Interfaz que representa el modelo de una orden de compra en el dominio.
 *
 * Contiene la información esencial para representar y manipular órdenes
 * dentro del sistema de acuerdo con las reglas de negocio.
 *
 * @remarks
 * Cada orden incluye un identificador único numérico `id`, un número de orden `orderNumber`,
 * el nombre del cliente `customerName`, el monto total `total` y el estado actual `status`.
 *
 * @example
 * ```ts
 * const orden: OrderModel = {
 *   id: 1,
 *   orderNumber: 'ORD-2026-001',
 *   customerName: 'Andres Felipe Saavedra',
 *   total: 155000,
 *   status: 'COMPLETED'
 * };
 * ```
 */
export interface OrderModel {
  /**
   * Identificador único de la orden.
   * @type {number}
   */
  id: number;

  /**
   * Código o número de referencia único de la orden.
   * @type {string}
   */
  orderNumber: string;

  /**
   * Nombre del cliente que realizó la orden de compra.
   * @type {string}
   */
  customerName: string;

  /**
   * Valor total monetario de la orden de compra.
   * @type {number}
   */
  total: number;

  /**
   * Estado actual del ciclo de vida de la orden.
   * @type {OrderStatus}
   */
  status: OrderStatus;
}

/**
 * Tipo que define los estados válidos para una orden de compra.
 *
 * @remarks
 * Restringe los estados a los valores permitidos en el negocio:
 * - 'COMPLETED': Orden completada con éxito.
 * - 'PENDING': Orden pendiente de procesamiento.
 * - 'PROCESSING': Orden en proceso de preparación.
 * - 'DELIVERED': Orden entregada al cliente.
 * - 'CANCELLED': Orden cancelada.
 */
export type OrderStatus = 'COMPLETED' | 'PENDING' | 'PROCESSING' | 'DELIVERED' | 'CANCELLED';

/**
 * Alias de compatibilidad para el modelo de orden.
 */
export type Order = OrderModel;
