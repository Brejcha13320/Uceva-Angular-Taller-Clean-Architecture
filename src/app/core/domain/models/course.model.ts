/**
 * Interfaz que representa un curso.
 *
 * Contiene la información básica necesaria para mostrar un curso
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada curso debe tener un `id` único, un `name` descriptivo,
 * un número de `credits` válido, un `teacher` asignado y una `faculty` correspondiente.
 *
 * @example
 * ```ts
 * const curso: Course = {
 *   id: 1,
 *   name: 'Programación Orientada a Objetos',
 *   credits: 3,
 *   teacher: 'Juan Pérez',
 *   faculty: 'Ingenieria'
 * };
 * ```
 */
export interface Course {
    /** Identificador único del curso */
    id: number;

    /** Nombre o descripción del curso */
    name: string;

    /** Créditos académicos del curso */
    credits: number;

    /** Nombre del profesor asignado al curso */
    teacher: string;

    /** Facultad a la que pertenece el curso */
    faculty: CourseFaculty;
}

/**
 * Tipo de facultad académica.
 *
 * @remarks
 * Este tipo restringe las facultades a los valores predefinidos:
 * - 'Ingenieria'
 * - 'Ciencias'
 * - 'Administracion'
 * - 'Derecho'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const facultad: CourseFaculty = 'Ingenieria';
 * ```
 */
export type CourseFaculty = 'Ingenieria' | 'Ciencias' | 'Administracion' | 'Derecho';
