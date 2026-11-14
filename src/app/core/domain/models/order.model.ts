/**
 * Interfaz que representa un pedido.
 *
 * Contiene la información básica necesaria para mostrar un pedido
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada pedido debe tener un `id` único, el `customer` que lo realizó,
 * el `total` en pesos, la fecha `createdAt` en formato ISO 8601
 * y el `status` que indica el estado actual del pedido.
 *
 * @example
 * ```ts
 * const pedido: Order = {
 *   id: 1,
 *   customer: 'Carlos Ramírez',
 *   total: 125000,
 *   createdAt: '2026-10-01T15:30:00.000Z',
 *   status: 'Pendiente'
 * };
 * ```
 */
export interface Order {
    /** Identificador único del pedido */
    id: number;

    /** Nombre del cliente que realizó el pedido */
    customer: string;

    /** Total del pedido en pesos */
    total: number;

    /** Fecha de creación del pedido en formato ISO 8601 */
    createdAt: string;

    /** Estado actual del pedido */
    status: OrderStatus;
}

/**
 * Tipo de estado de pedido.
 *
 * @remarks
 * Este tipo restringe los estados a los valores predefinidos:
 * - 'Pendiente'
 * - 'Enviado'
 * - 'Entregado'
 * - 'Cancelado'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const estado: OrderStatus = 'Enviado';
 * ```
 */
export type OrderStatus = 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';