import { Component, inject, OnInit } from '@angular/core';
import { GetAllOrdersUseCase } from '../../../core/application/usecases/get-all-orders.usecase';
import { OrderModel } from '../../../core/domain/models/order.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Componente contenedor de órdenes de compra (Smart Component).
 *
 * Se encarga de orquestar la obtención del listado de órdenes mediante
 * la invocación directa y exclusiva del caso de uso {@link GetAllOrdersUseCase},
 * gestionando el ciclo de vida asincrónico a través del estado {@link State}.
 *
 * @remarks
 * Este componente pertenece a la capa de presentación y administra:
 * - El estado de carga (`loading`), éxito (`success`) o fallo (`error`).
 * - El almacenamiento de las órdenes recuperadas en memoria.
 * - La delegación de la visualización al componente tonto {@link OrdersTableComponent}
 *   y las alertas al componente {@link AlertComponent}.
 */
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  imports: [OrdersTableComponent, AlertComponent],
  providers: [GetAllOrdersUseCase],
})
export class OrdersPage implements OnInit {
  /**
   * Listado de órdenes de compra obtenidas desde el caso de uso.
   * @type {OrderModel[]}
   */
  orders: OrderModel[] = [];

  /**
   * Estado asincrónico actual de la página.
   * @type {State}
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Caso de uso para obtener las órdenes del sistema.
   * Inyectado mediante la función `inject()` de Angular.
   */
  private getAllOrdersUseCase = inject(GetAllOrdersUseCase);

  /**
   * Inicializa el componente solicitando las órdenes al caso de uso.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllOrdersUseCase.execute().subscribe({
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
