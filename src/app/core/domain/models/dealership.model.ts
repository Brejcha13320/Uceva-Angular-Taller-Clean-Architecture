import { Vehicle } from "./vehicle.model";

/**
 * Interfaz que representa un concesionario.
 *
 * Contiene la información básica necesaria para mostrar un concesionario
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada concesionario debe tener un `id` único, un `name` descriptivo,
 * una `location` válida y un `continent` en el que se encuentra.
 *
 * @example
 * ```ts
 * const concesionario: Dealership = {
 *   id: 1,
 *   name: 'Toyota Center',
 *   location: 'New York',
 *   continent: 'America',
 *   vehicles: []
 * };
 * ```
 */

export interface Dealership {
    /** Identificador único del concesionario */
    id: number;
    /** Nombre del concesionario */
    name: string;
    /** Ubicación del concesionario */
    location: string;
    /** Continente donde se encuentra el concesionario */
    continent: DealershipContinent;

}

/**
 * Tipo de categoría de concesionario.
 *
 * @remarks
 * Este tipo restringe las categorías a los valores predefinidos:
 * - 'America'
 * - 'Europe'
 * - 'Asia'
 * - 'Africa'
 * - 'Oceania'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const categoria: DealershipContinent = 'America';
 * ```
 */

export type DealershipContinent = 'America' | 'Europe' | 'Asia' | 'Africa' | 'Oceania';
