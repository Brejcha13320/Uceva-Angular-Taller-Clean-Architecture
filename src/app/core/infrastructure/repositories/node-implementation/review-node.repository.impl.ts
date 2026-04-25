import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReviewRepository } from "../../../domain/repositories/review.repository";
import { DataService } from "../../services/data.service";
import { Review } from "../../../domain/models/review.model";

/**
 * Implementación concreta del repositorio de reseñas con backend Node.js.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link ReviewRepository}
 * - La fuente de datos remota Node.js {@link DataService}
 *
 * Responsabilidades:
 * - Implementar el contrato definido por el dominio
 * - Delegar la obtención de datos al datasource Node.js
 * - Adaptar, transformar o enriquecer los datos si es necesario
 *
 * ❗ Este repositorio NO contiene lógica de negocio.
 * ❗ No expone detalles de infraestructura al dominio.
 *
 * @see {@link ReviewRepository}
 * @see {@link DataService}
 */
@Injectable()
export class ReviewNodeRepositoryImpl extends ReviewRepository {

    /**
     * Datasource encargado de obtener los datos de reseñas desde Node.js.
     *
     * @remarks
     * Se inyecta usando la función `inject()` de Angular
     * para evitar constructores explícitos y favorecer
     * un estilo más declarativo.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de reseñas desde el backend Node.js.
     *
     * @remarks
     * Este método cumple el contrato definido en
     * {@link ReviewRepository#getAll}.
     *
     * Actualmente delega directamente la llamada al
     * {@link DataService}, pero este es el lugar
     * adecuado para:
     * - Cachear respuestas
     * - Mapear DTO a modelos de dominio
     * - Aplicar lógica de transformación
     * - Manejar errores específicos de la API
     *
     * @returns {Observable<Review[]>} Observable que emite el array de reseñas desde Node.js
     *
     * @example
     * ```ts
     * this.reviewRepository.getAll().subscribe(
     *   reviews => console.log(reviews),
     *   error => console.error(error)
     * );
     * ```
     */
    override getAll(): Observable<Review[]> {
        return this.dataService.getAllReviewsNode(10);
    }
}
