/**
 * Interfaz que representa una categoría de productos en el dominio del sistema.
 *
 * Contiene la información fundamental para representar y visualizar una categoría
 * dentro de la aplicación.
 *
 * @remarks
 * Cada categoría debe tener un `id` numérico único, un `name` representativo,
 * una `description` explicativa y un estado booleano `active`.
 *
 * @example
 * ```ts
 * const categoria: Category = {
 *   id: 1,
 *   name: 'Lácteos',
 *   description: 'Productos derivados de la leche como quesos, yogures y mantequilla',
 *   active: true
 * };
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export interface Category {
  /** Identificador único de la categoría */
  id: number;

  /** Nombre descriptivo de la categoría */
  name: string;

  /** Descripción detallada de la categoría y sus productos asociados */
  description: string;

  /** Estado que indica si la categoría se encuentra activa en el catálogo */
  active: boolean;
}

/**
 * Tipo alias representativo del modelo Category para compatibilidad con la convención CategoryModel.
 */
export type CategoryModel = Category;
