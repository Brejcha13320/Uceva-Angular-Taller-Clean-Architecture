import { Review } from '../core/domain/models/review.model';

/**
 * Array de reseñas simuladas para propósitos de prueba y desarrollo.
 *
 * @remarks
 * Estos datos se utilizan en la implementación local del repositorio
 * para simular respuestas del servidor cuando no hay conectividad
 * o durante el desarrollo sin backend.
 *
 * @example
 * ```ts
 * import { REVIEWS_MOCKS } from './reviews.mocks';
 *
 * // En el repositorio local
 * return of(REVIEWS_MOCKS);
 * ```
 */
export const REVIEWS_MOCKS: Review[] = [
  {
    id: 1,
    userId: 1,
    productId: 1,
    rating: 5,
    comment: 'Excelente producto, muy recomendado. Llegó en perfecto estado.',
    date: '2024-04-20',
  },
  {
    id: 2,
    userId: 2,
    productId: 1,
    rating: 4,
    comment: 'Buen producto, aunque la entrega tardó más de lo esperado.',
    date: '2024-04-19',
  },
  {
    id: 3,
    userId: 3,
    productId: 2,
    rating: 5,
    comment: 'Superó mis expectativas. Calidad premium a buen precio.',
    date: '2024-04-18',
  },
  {
    id: 4,
    userId: 4,
    productId: 2,
    rating: 3,
    comment: 'Es un producto aceptable, nada especial pero cumple su función.',
    date: '2024-04-17',
  },
  {
    id: 5,
    userId: 5,
    productId: 3,
    rating: 5,
    comment: 'Fantástico. Lo recomiendo ampliamente a todos mis amigos.',
    date: '2024-04-16',
  },
  {
    id: 6,
    userId: 1,
    productId: 3,
    rating: 4,
    comment: 'Muy bueno, pero el empaque podría ser mejor.',
    date: '2024-04-15',
  },
  {
    id: 7,
    userId: 2,
    productId: 4,
    rating: 2,
    comment: 'No es lo que esperaba. La calidad es inferior a otras marcas.',
    date: '2024-04-14',
  },
  {
    id: 8,
    userId: 3,
    productId: 4,
    rating: 4,
    comment: 'Buena relación precio-calidad. Estoy satisfecho con mi compra.',
    date: '2024-04-13',
  },
  {
    id: 9,
    userId: 4,
    productId: 5,
    rating: 5,
    comment: 'Impecable en todos los aspectos. Definitivamente volveré a comprar.',
    date: '2024-04-12',
  },
  {
    id: 10,
    userId: 5,
    productId: 5,
    rating: 3,
    comment: 'Está bien, pero hay mejores opciones en el mercado.',
    date: '2024-04-11',
  },
];
