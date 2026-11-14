import { Component, inject, OnInit } from '@angular/core';
import { GetAllOrdersUseCase } from '../../../core/application/usecases/get-all-orders.usecase';
import { Order } from '../../../core/domain/models/order.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Componente contenedor de pedidos.
 *
 * Se utiliza para gestionar y mostrar un listado de pedidos
 * utilizando el componente `OrdersTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el caso de uso `GetAllOrdersUseCase`
 * para obtener los pedidos y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 */
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  imports: [OrdersTableComponent, AlertComponent],
  providers: [GetAllOrdersUseCase]
})
export class OrdersPage implements OnInit {
  /**
   * Listado de pedidos obtenidos desde el caso de uso.
   * @type {Order[]}
   */
  orders: Order[] = [];

  /**
   * Estado actual del componente.
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Caso de Uso para obtener pedidos.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllOrdersUseCase = inject(GetAllOrdersUseCase);

  /**
   * Inicializa el componente y carga los pedidos.
   * @remarks
   * Se suscribe al método `execute()` del caso de uso y
   * asigna los datos recibidos a la propiedad `orders`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllOrdersUseCase.execute(10).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }
}