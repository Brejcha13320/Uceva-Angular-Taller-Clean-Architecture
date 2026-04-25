import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataService } from "../../services/data.service";
import { DealershipRepository } from "../../../domain/repositories/dealership.repository";
import { Dealership } from "../../../domain/models/dealership.model";


/**
 * Implementación concreta del repositorio de conseccionarios.
 *
 * @remarks
 * Forma parte de la **capa de Infrastructure** y cumple
 * el rol de **Adapter** entre el dominio y la fuente de datos.
 *
 * Implementa el contrato {@link DealershipRepository}
 * utilizando {@link DataService} como datasource.
 *
 * Este patrón permite:
 * - Desacoplar el dominio de detalles técnicos
 * - Sustituir la fuente de datos sin afectar casos de uso
 * - Facilitar pruebas unitarias mediante mocks
 *
 * @see {@link DealershipRepository}
 * @see {@link DataService}
 */
@Injectable()
export class DealershipNodeRepositoryImpl extends DealershipRepository {

    /**
     * Datasource encargado de obtener los datos de conseccionarios.
     *
     * @remarks
     * Se inyecta mediante la API `inject()` de Angular,
     * recomendada en arquitecturas modernas y código standalone.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de conseccionarios.
     *
     * @remarks
     * Implementa el método definido en
     * {@link DealershipRepository#getAll}.
     *
     * En este nivel se pueden realizar:
     * - Transformaciones de datos
     * - Manejo de errores
     * - Políticas de caché
     *
     * @param countDealerships - Cantidad de conseccionarios a solicitar
     * @returns Observable que emite un arreglo de {@link Dealership}
     */
    getAll(countDealerships: number): Observable<Dealership[]> {
        return this.dataService.getAllDealershipsNode(countDealerships);
    }

}
