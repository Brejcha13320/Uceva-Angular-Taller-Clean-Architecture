import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

/**
 * Contrato del repositorio de productos.
 *
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `Product` dentro del dominio.
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
 * // Inyección de dependencia por contrato
 * constructor(private productRepository: ProductRepository) {}
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see Product
 */
export abstract class ProductRepository {

  /**
   * Obtiene el listado completo de productos.
   *
   * @returns {Observable<Product[]>}
   * Observable que emite un arreglo de productos del dominio.
   *
   * @remarks
   * - No define la fuente de datos.
   * - No gestiona errores de presentación.
   * - Propaga los errores al consumidor.
   */
  abstract getAll(countUsers: number): Observable<Product[]>;
}