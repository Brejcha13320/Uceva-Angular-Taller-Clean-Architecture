import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../../core/domain/models/review.model';

/**
 * Componente de tabla para mostrar reseñas.
 *
 * @remarks
 * Este componente recibe un array de reseñas y las muestra
 * en formato tabla utilizado Bootstrap.
 *
 * Forma parte de la capa de presentación y es reutilizable
 * en diferentes contextos de la aplicación.
 *
 * @example
 * ```html
 * <app-reviews-table [reviews]="reviews"></app-reviews-table>
 * ```
 */
@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  styleUrl: './reviews-table.component.scss',
  imports: [CommonModule]
})
export class ReviewsTableComponent {
  /**
   * Array de reseñas a mostrar en la tabla.
   *
   * @type {Review[]}
   * @default []
   */
  @Input() reviews: Review[] = [];
}
