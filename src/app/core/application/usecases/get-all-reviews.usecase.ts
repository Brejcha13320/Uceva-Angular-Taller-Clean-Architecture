import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../domain/models/review.model';
import { ReviewRepository } from '../../domain/repositories/review.repository';

/**
 * Caso de uso para obtener el listado completo de reseñas.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todas las
 * reseñas disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `ReviewRepository`.
 *
 * @remarks
 * - No conoce detalles de infraestructura.
 * - No transforma los datos para la UI.
 * - Propaga los resultados y errores al consumidor.
 *
 * La dependencia se resuelve mediante **inyección por contrato**
 * utilizando la función `inject()` de Angular.
 *
 * @example
 * ```ts
 * export class ReviewsPageComponent {
 *   private getAllReviewsUseCase = inject(GetAllReviewsUseCase);
 *
 *   ngOnInit(): void {
 *     this.getAllReviewsUseCase.execute().subscribe(
 *       (reviews: Review[]) => this.reviews = reviews,
 *       (error) => console.error(error)
 *     );
 *   }
 * }
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Review
 * @see ReviewRepository
 */
@Injectable()
export class GetAllReviewsUseCase {
  /**
   * Repositorio de reseñas inyectado por contrato.
   *
   * @remarks
   * La implementación concreta (Local, Node, SpringBoot) es resuelta
   * en tiempo de configuración de la aplicación mediante el archivo
   * `app.config.ts`, permitiendo intercambiar la fuente de datos
   * sin afectar este caso de uso.
   */
  private reviewRepository = inject(ReviewRepository);

  /**
   * Ejecuta el caso de uso para obtener todas las reseñas.
   *
   * @returns {Observable<Review[]>} Observable que emite el array de reseñas
   *
   * @remarks
   * Este método delega la ejecución al repositorio inyectado.
   * El repositorio es responsable de encapsular los detalles
   * de infraestructura.
   *
   * @example
   * ```ts
   * this.execute().subscribe(
   *   reviews => console.log(reviews),
   *   error => console.error(error)
   * );
   * ```
   */
  execute(): Observable<Review[]> {
    return this.reviewRepository.getAll();
  }
}
