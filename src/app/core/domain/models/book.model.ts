/**
 * Interfaz que representa un libro.
 *
 * Contiene la información básica necesaria para mostrar un libro
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada libro debe tener un `id` único, un `title` descriptivo,
 * un `author` asignado, un `year` de publicación válido y un `genre` correspondiente.
 *
 * @example
 * ```ts
 * const libro: Book = {
 *   id: 1,
 *   title: 'Cien años de soledad',
 *   author: 'Gabriel García Márquez',
 *   year: 1967,
 *   genre: 'Novela'
 * };
 * ```
 */
export interface Book {
    /** Identificador único del libro */
    id: number;

    /** Título del libro */
    title: string;

    /** Nombre del autor del libro */
    author: string;

    /** Año de publicación del libro */
    year: number;

    /** Género al que pertenece el libro */
    genre: BookGenre;
}

/**
 * Tipo de género literario.
 *
 * @remarks
 * Este tipo restringe los géneros a los valores predefinidos:
 * - 'Novela'
 * - 'Ciencia'
 * - 'Historia'
 * - 'Tecnologia'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const genero: BookGenre = 'Novela';
 * ```
 */
export type BookGenre = 'Novela' | 'Ciencia' | 'Historia' | 'Tecnologia';
