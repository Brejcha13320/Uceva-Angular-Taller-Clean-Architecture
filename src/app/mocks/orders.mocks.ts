import { OrderModel } from "../core/domain/models/order.model";

/**
 * Listado de órdenes simuladas para pruebas y desarrollo en memoria.
 *
 * @remarks
 * Contiene 5 órdenes con datos realistas para verificar
 * la presentación y la lógica de la aplicación sin backend.
 */
export const ORDERS_MOCK: OrderModel[] = [
  {
    id: 1,
    orderNumber: 'ORD-2026-001',
    customerName: 'Andres Felipe Saavedra',
    total: 155000,
    status: 'COMPLETED'
  },
  {
    id: 2,
    orderNumber: 'ORD-2026-002',
    customerName: 'Jhon Edward Loaiza',
    total: 320000,
    status: 'PROCESSING'
  },
  {
    id: 3,
    orderNumber: 'ORD-2026-003',
    customerName: 'Jose Sebastian Arenas',
    total: 89500,
    status: 'PENDING'
  },
  {
    id: 4,
    orderNumber: 'ORD-2026-004',
    customerName: 'Jesus David Mejia',
    total: 450000,
    status: 'DELIVERED'
  },
  {
    id: 5,
    orderNumber: 'ORD-2026-005',
    customerName: 'Maria Camila Restrepo',
    total: 210000,
    status: 'CANCELLED'
  }
];
