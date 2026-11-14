import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrderRepository } from "../../../domain/repositories/order.repository";
import { DataService } from "../../services/data.service";
import { Order } from "../../../domain/models/order.model";

/**
 * Implementación concreta del repositorio de pedidos.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link OrderRepository}
 * - La fuente de datos {@link DataService}
 *
 * Responsabilidades:
 * - Implementar el contrato definido por el dominio
 * - Delegar la obtención de datos al datasource
 * - Adaptar, transformar o enriquecer los datos si es necesario
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
     * Datasource encargado de obtener los datos de pedidos.
     *
     * @remarks
     * Se inyecta usando la función `inject()` de Angular
     * para evitar constructores explícitos y favorecer
     * un estilo más declarativo.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de pedidos.
     *
     * @remarks
     * Este método cumple el contrato definido en
     * {@link OrderRepository#getAll}.
     *
     * Actualmente delega directamente la llamada al
     * {@link DataService}, pero este es el lugar
     * adecuado para:
     * - Mapear DTOs a modelos de dominio
     * - Aplicar filtros o transformaciones
     * - Manejar errores o estrategias de caché
     *
     * @param countOrders - Cantidad de pedidos a solicitar
     * @returns Observable que emite un arreglo de {@link Order}
     */
    getAll(countOrders: number): Observable<Order[]> {
        return this.dataService.getAllOrdersLocal(countOrders);
    }

}