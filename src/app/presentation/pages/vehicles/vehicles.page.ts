import { Component, inject } from '@angular/core';
import { Vehicle } from '../../../core/domain/models/vehicle.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { VehiclesTableComponent } from '../../components/vehicles-table/vehicles-table.component';
import { State } from '../../interfaces/state.interface';
import { GetAllVehiclesUseCase } from '../../../core/application/usecases/get-all-vehicles.usecase';

/**
 * Componente contenedor de vehículos.
 *
 * Se utiliza para gestionar y mostrar un listado de vehículos
 * utilizando el componente `VehiclesTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `VehiclesService`
 * para obtener los vehículos y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 *
 */
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  imports: [VehiclesTableComponent, AlertComponent],
  providers: [GetAllVehiclesUseCase]
})
export class VehiclesPage {
  /**
   * Listado de vehículos obtenidos desde el servicio.
   * @type {Vehicle[]}
   */
  vehicles: Vehicle[] = [];
  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Caso de Uso para obtener vehículos.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllVehiclesUseCase = inject(GetAllVehiclesUseCase);

  /**
   * Inicializa el componente y carga los vehículos.
   * @remarks
   * Se suscribe al método `execute()` del caso de uso y
   * asigna los datos recibidos a la propiedad `vehicles`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllVehiclesUseCase.execute(10).subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }
}
