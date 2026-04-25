import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Dealership, DealershipContinent } from '../../../core/domain/models/dealership.model';

/**
 * Componente de tabla de concesionarios.
 *
 * Se utiliza para mostrar un listado de concesionarios en una tabla,
 * mostrando información como id, nombre, ubicación, continente
 * y un badge visual que indica la categoría de cada concesionario.
 *
 * @remarks
 * Este componente recibe los concesionarios desde un componente padre
 * a través del Input `dealerships` y utiliza el mapeo ``
 * para asignar colores a los badges según la categoría.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-dealerships-table [dealerships]="dealershipsList"></app-dealerships-table>
 * ```
 */
@Component({
  selector: 'app-dealerships-table',
  templateUrl: './dealerships-table.component.html',
  imports: [BadgeAtom],
})
export class DealershipsTableComponent {
  /**
   * Listado de concesionarios que se mostrarán en la tabla.
   * @type {Dealership[]}
   * @remarks
   * Este Input permite pasar un array de concesionarios desde un componente padre,
   * generalmente `ListDealershipsComponent`. Cada concesionario debe cumplir la interfaz `Dealership`.
   */
  @Input() dealerships: Dealership[] = [];
  /**
   * Mapeo de categorías de concesionarios a tipos de Badge.
   * @type {Record<Category, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada categoría:
    * - 'America' => 'success' (verde)
    * - 'Europe' => 'primary' (azul)
    * - 'Asia' => 'warning' (amarillo)
    * - 'Africa' => 'danger' (rojo)
    * - 'Oceania' => 'info' (celeste)
   *
   * Esto permite que en la tabla cada concesionario tenga un badge visual que indique su categoría
   * de forma clara para el usuario.
   */
  continentType: Record<DealershipContinent, BadgeType> = {
    'America': 'success',
    'Europe': 'primary',
    'Asia': 'warning',
    'Africa': 'danger',
    'Oceania': 'info'
  }
}
