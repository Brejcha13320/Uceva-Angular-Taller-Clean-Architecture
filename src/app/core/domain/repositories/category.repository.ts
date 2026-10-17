import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

/**
 * Contrato del repositorio de categorías.
 *
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `Category` dentro del dominio.
 *
 * Forma parte de la **capa de dominio** y establece las operaciones
 * que cualquier implementación concreta debe cumplir, sin exponer
 * detalles de infraestructura (HTTP, base de datos, mocks, etc.).
 *
 * @remarks
 * Las implementaciones concretas de este repositorio residen
 * en la capa de infraestructura y son completamente intercambiables
 * sin afectar a las reglas de negocio ni a los casos de uso.
 *
 * @example
 * ```ts
 * // Inyección de dependencia por contrato abstracto
 * constructor(private categoryRepository: CategoryRepository) {}
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see Category
 */
export abstract class CategoryRepository {

  /**
   * Obtiene el listado completo de categorías registradas en el sistema.
   *
   * @returns {Observable<Category[]>}
   * Observable que emite un arreglo de categorías del dominio.
   *
   * @remarks
   * - No define la fuente de datos concreta.
   * - No gestiona errores de presentación.
   * - Propaga los errores asíncronos directamente al consumidor.
   */
  abstract getAll(): Observable<Category[]>;
}
