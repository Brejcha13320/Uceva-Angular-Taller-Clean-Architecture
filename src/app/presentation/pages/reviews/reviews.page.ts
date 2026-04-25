import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllReviewsUseCase } from '../../../core/application/usecases/get-all-reviews.usecase';
import { Review } from '../../../core/domain/models/review.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { ReviewsTableComponent } from '../../components/reviews-table/reviews-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Componente contenedor de reseñas.
 *
 * Se utiliza para gestionar y mostrar un listado de reseñas
 * utilizando el componente `ReviewsTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `GetAllReviewsUseCase`
 * para obtener las reseñas y pasarlas al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 *
 */
@Component({
  selector: 'app-reviews',
  templateUrl: `./reviews.page.html`,
  imports: [CommonModule, ReviewsTableComponent, AlertComponent],
  providers: [GetAllReviewsUseCase]
})
export class ReviewsPage {
  /**
   * Listado de reseñas obtenidas desde el servicio.
   * @type {Review[]}
   */
  reviews: Review[] = [];
  /**
     * Estado actual del componente.
     *
     * @default 'init'
     */
    state: State = 'init';
  

  /**
   * Caso de Uso para obtener reseñas.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllReviewsUseCase = inject(GetAllReviewsUseCase);

  /**
   * Inicializa el componente y carga las reseñas.
   * @remarks
   * Se suscribe al método `execute()` del caso de uso y
   * asigna los datos recibidos a la propiedad `reviews`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllReviewsUseCase.execute().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.state = 'success';
      },
      error: (error) => {
        console.error('Error al obtener reseñas:', error);
        this.state = 'error';
      }
    });
  }
}
