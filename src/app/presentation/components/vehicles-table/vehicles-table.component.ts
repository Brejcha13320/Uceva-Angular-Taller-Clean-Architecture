import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Vehicle, VehicleCategory } from '../../../core/domain/models/vehicle.model';

/**
 * Componente de tabla de vehículos.
 *
 * Se utiliza para mostrar un listado de vehículos en una tabla,
 * mostrando información como id, marca, modelo, año, color y precio,
 * y un badge visual que indica la categoría de cada vehículo.
 *
 * @remarks
 * Este componente recibe los vehículos desde un componente padre
 * a través del Input `vehicles` y utiliza el mapeo ``
 * para asignar colores a los badges según la categoría.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-vehicles-table [vehicles]="vehiclesList"></app-vehicles-table>
 * ```
 */
@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  imports: [BadgeAtom],
})
export class VehiclesTableComponent {
  /**
   * Listado de vehículos que se mostrarán en la tabla.
   * @type {Vehicle[]}
   * @remarks
   * Este Input permite pasar un array de vehículos desde un componente padre,
   * generalmente `ListVehiclesComponent`. Cada vehículo debe cumplir la interfaz `Vehicle`.
   */
  @Input() vehicles: Vehicle[] = [];
  /**
   * Mapeo de categorías de vehículos a tipos de Badge.
   * @type {Record<Category, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada categoría:
   * - 'Sedan' → 'success' (verde)
   * - 'SUV' → 'primary' (azul)
   * - 'Camioneta' → 'warning' (amarillo)
   *
   * Esto permite que en la tabla cada vehículo tenga un badge visual que indique su categoría
   * de forma clara para el usuario.
   */
  engineeringMap: Record<VehicleCategory, BadgeType> = {
    'Sedan' : 'success',
    'SUV': 'primary',
    'Camioneta': 'warning',
  }
}
