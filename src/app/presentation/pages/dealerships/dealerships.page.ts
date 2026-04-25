import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../components/alert/alert.component';
import { State } from '../../interfaces/state.interface';
import { Dealership } from '../../../core/domain/models/dealership.model';
import { GetAllDealershipsUseCase } from '../../../core/application/usecases/get-all-dealership.usecase';
import { DealershipsTableComponent } from '../../components/dealerships-table/dealerships-table.component';

/**
 * Componente contenedor de conseccionarios.
 *
 * Se utiliza para gestionar y mostrar un listado de conseccionarios
 * utilizando el componente `dealershipsTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `dealershipsService`
 * para obtener los conseccionarios y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 *
 */
@Component({
  selector: 'app-dealerships',
  templateUrl: './dealerships.page.html',
  imports: [DealershipsTableComponent, AlertComponent],
  providers: [GetAllDealershipsUseCase]
})
export class DealershipsPage {
  /**
   * Listado de conseccionarios obtenidos desde el servicio.
   * @type {Dealership[]}
   */
  dealerships: Dealership[] = [];
  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Caso de Uso para obtener conseccionarios.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllDealershipsUseCase = inject(GetAllDealershipsUseCase);

  /**
   * Inicializa el componente y carga los conseccionarios.
   * @remarks
   * Se suscribe al método `execute()` del caso de uso y
   * asigna los datos recibidos a la propiedad `dealerships`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllDealershipsUseCase.execute(10).subscribe({
      next: (dealerships) => {
        this.dealerships = dealerships;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }
}
