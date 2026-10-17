import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../domain/models/category.model';
import { CategoryRepository } from '../../domain/repositories/category.repository';

/**
 * Caso de uso para obtener el listado completo de categorías.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todas las
 * categorías de productos disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `CategoryRepository`.
 *
 * @remarks
 * - No conoce detalles de infraestructura.
 * - No transforma los datos para la UI.
 * - Propaga los resultados y errores directamente al consumidor.
 *
 * La dependencia se resuelve mediante **inyección por contrato**
 * utilizando la función `inject()` de Angular.
 *
 * @example
 * ```ts
 * this.getAllCategoriesUseCase.execute().subscribe(categories => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Category
 * @see CategoryRepository
 */
@Injectable()
export class GetAllCategoriesUseCase {

  /**
   * Repositorio de categorías inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private categoryRepository = inject(CategoryRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @returns {Observable<Category[]>}
   * Observable que emite el listado completo de categorías del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Mantiene el principio de responsabilidad única.
   */
  execute(): Observable<Category[]> {
    return this.categoryRepository.getAll();
  }
}
