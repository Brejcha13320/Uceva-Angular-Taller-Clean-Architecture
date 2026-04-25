/**
 * Interfaz que representa una reseña (review).
 *
 * Contiene la información básica necesaria para mostrar una reseña
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada reseña debe tener un `id` único, un `userId` que identifica
 * al usuario que hizo la reseña, un `productId` del producto siendo
 * reseñado, una `rating` de 1 a 5 y un `comment` descriptivo.
 *
 * @example
 * ```ts
 * const review: Review = {
 *   id: 1,
 *   userId: 42,
 *   productId: 10,
 *   rating: 5,
 *   comment: 'Excelente producto, muy recomendado',
 *   date: '2024-04-24'
 * };
 * ```
 */
export interface Review {
  /**
   * Identificador único de la reseña.
   * @type {number}
   */
  id: number;

  /**
   * Identificador del usuario que realizó la reseña.
   * @type {number}
   */
  userId: number;

  /**
   * Identificador del producto siendo reseñado.
   * @type {number}
   */
  productId: number;

  /**
   * Calificación numérica del 1 al 5.
   * @type {number}
   */
  rating: number;

  /**
   * Comentario o descripción de la reseña.
   * @type {string}
   */
  comment: string;

  /**
   * Fecha en la que se realizó la reseña.
   * @type {string}
   */
  date: string;
}
