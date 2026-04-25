/**
 * Interfaz que representa un vehículo.
 *
 * Contiene la información básica necesaria para mostrar un vehículo
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada vehículo debe tener un `id` único, un `brand` y un `model` descriptivos,
 * una `category` válida y un `price` en pesos colombianos.
 *
 * @example
 * ```ts
 * const vehiculo: Vehicle = {
 *   id: 1,
 *   brand: 'Toyota',
 *   model: 'Corolla',
 *   year: 2020,
 *   color: 'Blanco',
 *   price: 25000
 * };
 * ```
 */
export interface Vehicle {
    /** Identificador único del vehículo */
    id: number;

    /** Marca del vehículo */
    brand: string;

    /** Categoría del vehículo */
    category: VehicleCategory;

    /** Precio del vehículo en pesos */
    price: string;

    /** Año de fabricación del vehículo */
    year: number;
}

/**
 * Tipo de categoría de vehículo.
 *
 * @remarks
 * Este tipo restringe las categorías a los valores predefinidos:
 * - 'Sedan'
 * - 'SUV'
 * - 'Camioneta'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const categoria: VehicleCategory = 'Sedan';
 * ```
 */
export type VehicleCategory = 'Sedan' | 'SUV' | 'Camioneta';