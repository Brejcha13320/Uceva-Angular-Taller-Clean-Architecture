import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BookRepository } from "../../../domain/repositories/book.repository";
import { DataService } from "../../services/data.service";
import { Book } from "../../../domain/models/book.model";

/**
 * Implementación concreta del repositorio de libros.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link BookRepository}
 * - La fuente de datos {@link DataService}
 *
 * Responsabilidades:
 * - Implementar el contrato definido por el dominio
 * - Delegar la obtención de datos al datasource
 * - Adaptar, transformar o enriquecer los datos si es necesario
 *
 * ❗ Este repositorio NO contiene lógica de negocio.
 * ❗ No expone detalles de infraestructura al dominio.
 *
 * @see {@link BookRepository}
 * @see {@link DataService}
 */
@Injectable()
export class BookLocalRepositoryImpl extends BookRepository {

    /**
     * Datasource encargado de obtener los datos de libros.
     *
     * @remarks
     * Se inyecta usando la función `inject()` de Angular
     * para evitar constructores explícitos y favorecer
     * un estilo más declarativo.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de libros.
     *
     * @remarks
     * Este método cumple el contrato definido en
     * {@link BookRepository#getAll}.
     *
     * Actualmente delega directamente la llamada al
     * {@link DataService}, pero este es el lugar
     * adecuado para:
     * - Mapear DTOs a modelos de dominio
     * - Aplicar filtros o transformaciones
     * - Manejar errores o estrategias de caché
     *
     * @param countBooks - Cantidad de libros a solicitar
     * @returns Observable que emite un arreglo de {@link Book}
     */
    getAll(countBooks: number): Observable<Book[]> {
        return this.dataService.getAllBooksLocal(countBooks);
    }

}
