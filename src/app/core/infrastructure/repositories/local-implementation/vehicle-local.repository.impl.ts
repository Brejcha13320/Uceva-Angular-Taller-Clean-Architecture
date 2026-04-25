import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VehicleRepository } from "../../../domain/repositories/vehicle.repository";
import { DataService } from "../../services/data.service";
import { Vehicle } from "../../../domain/models/vehicle.model";


/**
 * Implementación concreta del repositorio de vehículos.
 *
 * @remarks
 * Forma parte de la **capa de Infrastructure** y cumple
 * el rol de **Adapter** entre el dominio y la fuente de datos.
 *
 * Implementa el contrato {@link VehicleRepository}
 * utilizando {@link DataService} como datasource.
 *
 * Este patrón permite:
 * - Desacoplar el dominio de detalles técnicos
 * - Sustituir la fuente de datos sin afectar casos de uso
 * - Facilitar pruebas unitarias mediante mocks
 *
 * @see {@link VehicleRepository}
 * @see {@link DataService}
 */
@Injectable()
export class VehicleLocalRepositoryImpl extends VehicleRepository {

    /**
     * Datasource encargado de obtener los datos de vehículos.
     *
     * @remarks
     * Se inyecta mediante la API `inject()` de Angular,
     * recomendada en arquitecturas modernas y código standalone.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de usuarios.
     *
     * @remarks
     * Implementa el método definido en
     * {@link VehicleRepository#getAll}.
     *
     * En este nivel se pueden realizar:
     * - Transformaciones de datos
     * - Manejo de errores
     * - Políticas de caché
     *
     * @param countVehicles - Cantidad de vehículos a solicitar
     * @returns Observable que emite un arreglo de {@link Vehicle}
     */
    getAll(countVehicles: number): Observable<Vehicle[]> {
        return this.dataService.getAllVehiclesLocal(countVehicles);
    }

}