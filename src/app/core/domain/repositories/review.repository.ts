import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

/**
 * Contrato del repositorio de reseñas.
 *
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `Review` dentro del dominio.
 *
 * Forma parte de la **capa de dominio** y establece las operaciones
 * que cualquier implementación concreta debe cumplir, sin exponer
 * detalles de infraestructura (HTTP, base de datos, mocks, etc.).
 *
 * @remarks
 * Las implementaciones concretas de este repositorio pueden residir
 * en la capa de infraestructura y ser intercambiables sin afectar
 * al resto del sistema.
 *
 * @example
 * ```ts
 * constructor(private reviewRepository: ReviewRepository) {}
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see Review
 */
export abstract class ReviewRepository {
  /**
   * Obtiene todas las reseñas disponibles.
   *
   * @returns {Observable<Review[]>} Observable que emite un array de reseñas
   *
   * @remarks
   * Este método debe ser implementado por las clases concretas.
   * Las implementaciones pueden recuperar datos de diferentes fuentes:
   * - Mocks locales
   * - Backend Node.js
   * - Backend SpringBoot
   *
   * @example
   * ```ts
   * this.reviewRepository.getAll().subscribe(
   *   (reviews: Review[]) => console.log(reviews)
   * );
   * ```
   */
  abstract getAll(): Observable<Review[]>;
}
