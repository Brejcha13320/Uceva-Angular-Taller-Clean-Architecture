import { Order } from "../core/domain/models/order.model";

/**
 * Datos simulados de pedidos para desarrollo y pruebas.
 *
 * @description
 * Arreglo de pedidos mockeados con diferentes estados,
 * utilizado en la implementación de mock del repositorio.
 *
 * @remarks
 * Cada objeto cumple con la interfaz {@link Order}.
 */
export const ORDERS_MOCK: Order[] = [
    {
        id: 1,
        customer: 'Carlos Ramírez',
        total: 125000,
        createdAt: '2026-10-01T15:30:00Z',
        status: 'Pendiente'
    },
    {
        id: 2,
        customer: 'María González',
        total: 89000,
        createdAt: '2026-10-05T10:15:00Z',
        status: 'Entregado'
    }
];