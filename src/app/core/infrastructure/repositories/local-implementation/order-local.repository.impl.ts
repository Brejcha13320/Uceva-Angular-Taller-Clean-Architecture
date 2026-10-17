import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../../../domain/models/order.model';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación local del repositorio de órdenes.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link OrderRepository}
 * - La fuente de datos local {@link DataService}
 *
 * Responsabilidades:
 * - Implementar el contrato definido por el dominio
 * - Delegar la obtención de datos locales al datasource
 *
 * ❗ Este repositorio NO contiene lógica de negocio.
 * ❗ No expone detalles de infraestructura al dominio.
 *
 * @see {@link OrderRepository}
 * @see {@link DataService}
 */
@Injectable()
export class OrderLocalRepositoryImpl extends OrderRepository {

  /**
   * Datasource encargado de obtener los datos de órdenes.
   */
  private dataService = inject(DataService);

  /**
   * Obtiene el listado completo de órdenes desde la fuente de datos local.
   *
   * @returns {Observable<OrderModel[]>}
   * Observable que emite un arreglo de {@link OrderModel}
   */
  getAll(): Observable<OrderModel[]> {
    return this.dataService.getAllOrdersLocal();
  }
}
