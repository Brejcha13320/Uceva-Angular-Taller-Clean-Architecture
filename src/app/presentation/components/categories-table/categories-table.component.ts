import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Category } from '../../../core/domain/models/category.model';

/**
 * Componente de tabla para visualización de categorías.
 *
 * @description
 * Componente presentacional (Dumb Component) encargado de renderizar
 * la colección de categorías en formato de tabla con badges para el estado.
 *
 * @remarks
 * Este componente pertenece a la capa de presentación y no maneja lógica
 * de negocio ni efectos secundarios. Recibe los datos mediante el Input `categories`.
 *
 * @example
 * ```html
 * <app-categories-table [categories]="categoriesList"></app-categories-table>
 * ```
 */
@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  imports: [CommonModule, BadgeAtom],
})
export class CategoriesTableComponent {
  /**
   * Listado de categorías a renderizar en la tabla.
   * @type {Category[]}
   */
  @Input() categories: Category[] = [];

  /**
   * Mapeo del estado booleano de la categoría a estilos de Badge del Design System.
   * @type {Record<string, BadgeType>}
   */
  badgeMap: Record<string, BadgeType> = {
    'true': 'success',
    'false': 'secondary',
  };
}
