import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../../../domain/models/order.model';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación de Node.js del repositorio de órdenes.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link OrderRepository}
 * - La API REST de Node.js provista por {@link DataService}
 *
 * Responsabilidades:
 * - Implementar el contrato definido por el dominio
 * - Consumir el endpoint `/api/orders` del backend Node.js
 *
 * ❗ Este repositorio NO contiene lógica de negocio.
 * ❗ No expone detalles de infraestructura al dominio.
 *
 * @see {@link OrderRepository}
 * @see {@link DataService}
 */
@Injectable()
export class OrderNodeRepositoryImpl extends OrderRepository {

  /**
   * Datasource encargado de obtener los datos de órdenes desde Node.js.
   */
  private dataService = inject(DataService);

  /**
   * Obtiene el listado completo de órdenes desde el backend Node.js.
   *
   * @returns {Observable<OrderModel[]>}
   * Observable que emite un arreglo de {@link OrderModel}
   */
  getAll(): Observable<OrderModel[]> {
    return this.dataService.getAllOrdersNode();
  }
}
