import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import type { Faker } from "@faker-js/faker";
import { from, map, Observable, shareReplay } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Product, ProductCategory } from "../../domain/models/product.model";
import { User, UserEngineering } from "../../domain/models/user.model";
import { Course, CourseFaculty } from "../../domain/models/course.model";
import { Order, OrderStatus } from "../../domain/models/order.model";
import { Book, BookGenre } from "../../domain/models/book.model";

/**
 * Servicio de infraestructura para obtención de datos.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa
 * como un **Data Source** que provee información desde
 * diferentes orígenes:
 *
 * - Datos locales simulados (mocks)
 * - Backend Node.js mediante HTTP
 * - Backend SpringBoot mediante HTTP
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser consumido directamente por los casos de uso.
 *
 * Es utilizado por repositorios o servicios de infraestructura
 * que adaptan los datos al dominio.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
    /**
     * Cliente HTTP de Angular.
     *
     * @remarks
     * Se inyecta mediante la API `inject()` de Angular
     * para evitar el uso de constructores explícitos.
     */
    private httpClient = inject(HttpClient);
    /**
     * URL base del backend Node.js.
     *
     * @remarks
     * Se construye a partir de la configuración de entorno
     * definida en `environment`.
     */
    private nodeUrl = `${environment.baseUrlNode}/api`;
    /**
     * URL base del backend SpringBoot.
     *
     * @remarks
     * Se construye a partir de la configuración de entorno
     * definida en `environment`.
     */
    private springBootUrl = `${environment.baseUrlSpringBoot}/api`;

    /**
     * Carga diferida de Faker.
     *
     * @remarks
     * Faker es una dependencia grande (~486 kB) que solo se necesita para
     * generar los datos simulados. Se importa de forma dinámica para que
     * quede en un chunk aparte y no infle el bundle inicial; la promesa se
     * comparte para que la librería se cargue una única vez.
     */
    private readonly faker$ = from(import('@faker-js/faker/locale/en')).pipe(
        map((modulo) => modulo.faker),
        shareReplay(1),
    );

    /**
     * Genera un listado local una vez que Faker está disponible.
     *
     * @param construir - Función que arma el listado con la instancia de Faker
     * @returns Observable que emite el listado ya construido
     */
    private generarLocal<T>(construir: (faker: Faker) => T): Observable<T> {
        return this.faker$.pipe(map(construir));
    }

    // ---------------------------------------------------------------------
    // Métodos de usuarios
    // ---------------------------------------------------------------------
    /**
     * Obtiene el listado de USUARIOS desde datos locales simulados.
     *
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link User}
     */
    getAllUsersLocal(countUsers: number): Observable<User[]> {
        return this.generarLocal((faker) => {
            const users: User[] = [];
            const userEngineerings: UserEngineering[] = [
                'Sistemas',
                'Electronica',
                'Biomedica',
                'Industrial',
                'Ambiental',
            ];

            for(let i = 1 ; i <= countUsers ; i++){
                users.push({
                    id: i,
                    name: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    age: faker.number.int({ min: 18, max: 65 }),
                    email: faker.internet.email(),
                    engineering: faker.helpers.arrayElement(userEngineerings),
                })
            }

            return users;
        });
    }

    /**
     * Obtiene el listado de productos desde datos locales simulados.
     *
     * @param countProducts - Cantidad de productos a solicitar
     * @returns Observable que emite un arreglo de {@link Product}
     */
    getAllProductsLocal(countProducts: number): Observable<Product[]> {
        return this.generarLocal((faker) => {
            const products: Product[] = [];
            const productCategories: ProductCategory[] = [
                'Carnes',
                'Frutas',
                'Lacteos',
                'Verduras'
            ];
            for(let i = 1; i <= countProducts ; i++){
                products.push({
                    id: i,
                    name: faker.commerce.productName(),
                    price: Number(
                        faker.commerce.price({ min: 1, max: 100, dec: 2 })
                    ),
                    category: faker.helpers.arrayElement(productCategories),
                })
            }
            return products;
        });
    }

    /**
     * Obtiene el listado de usuarios desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/users/{countUsers}`.
     *
     * El número de usuarios a obtener se define
     * mediante el parámetro `countUsers`.
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link User}
     *
     * @example
     * ```ts
     * this.dataService.getAllUsersNode(10).subscribe(users => {
     *   console.log(users);
     * });
     * ```
     */
    getAllUsersNode(countUsers: number): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.nodeUrl}/users/${countUsers}`);
    }

    /**
     * Obtiene el listado de productos desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/products/{countProducts}`.
     *
     * @param countProducts - Cantidad de productos a solicitar
     * @returns Observable que emite un arreglo de {@link Product}
     *
     * @example
     * ```ts
     * this.dataService.getAllProductsNode(5).subscribe(products => {
     *   console.log(products);
     * });
     * ```
     */
    getAllProductsNode(countProducts: number): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.nodeUrl}/products/${countProducts}`);
    }

    // ---------------------------------------------------------------------
    // Métodos de usuarios (SpringBoot)
    // ---------------------------------------------------------------------
    /**
     * Obtiene el listado de usuarios desde el backend SpringBoot.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/users/{countUsers}`.
     *
     * El número de usuarios a obtener se define
     * mediante el parámetro `countUsers`.
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link User}
     *
     * @example
     * ```ts
     * this.dataService.getAllUsersSpringBoot(10).subscribe(users => {
     *   console.log(users);
     * });
     * ```
     */
    getAllUsersSpringBoot(countUsers: number): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.springBootUrl}/users/${countUsers}`);
    }

    // ---------------------------------------------------------------------
    // Métodos de productos (SpringBoot)
    // ---------------------------------------------------------------------
    /**
     * Obtiene el listado de productos desde el backend SpringBoot.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/products/{countProducts}`.
     *
     * @param countProducts - Cantidad de productos a solicitar
     * @returns Observable que emite un arreglo de {@link Product}
     *
     * @example
     * ```ts
     * this.dataService.getAllProductsSpringBoot(5).subscribe(products => {
     *   console.log(products);
     * });
     * ```
     */
    getAllProductsSpringBoot(countProducts: number): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.springBootUrl}/products/${countProducts}`);
    }

    // ---------------------------------------------------------------------
    // Métodos de cursos locales, Node.js y SpringBoot
    // ---------------------------------------------------------------------
    /**
     * Obtiene el listado de cursos desde datos locales simulados.
     *
     * @param countCourses - Cantidad de cursos a solicitar
     * @returns Observable que emite un arreglo de {@link Course}
     */
    getAllCoursesLocal(countCourses: number): Observable<Course[]> {
        return this.generarLocal((faker) => {
            const courses: Course[] = [];
            const courseFaculties: CourseFaculty[] = [
                'Ingenieria',
                'Ciencias',
                'Administracion',
                'Derecho'
            ];
            const courseNames: string[] = [
                'Programación Orientada a Objetos',
                'Bases de Datos',
                'Cálculo Diferencial',
                'Estructuras de Datos',
                'Redes de Computadores',
                'Arquitectura de Software',
                'Algebra Lineal',
                'Fisión Mecánica',
                'Contabilidad Basica',
                'Derecho Constitucional',
                'Estadistica',
                'Ingenieria de Requisitos'
            ];

            for (let i = 1; i <= countCourses; i++) {
                courses.push({
                    id: i,
                    name: faker.helpers.arrayElement(courseNames),
                    credits: faker.number.int({ min: 1, max: 6 }),
                    teacher: faker.person.fullName(),
                    faculty: faker.helpers.arrayElement(courseFaculties)
                });
            }
            return courses;
        });
    }

    /**
     * Obtiene el listado de cursos desde el backend Node.js.
     *
     * @param countCourses - Cantidad de cursos a solicitar
     * @returns Observable que emite un arreglo de {@link Course}
     */
    getAllCoursesNode(countCourses: number): Observable<Course[]> {
        return this.httpClient.get<Course[]>(`${this.nodeUrl}/courses/${countCourses}`);
    }

    /**
     * Obtiene el listado de cursos desde el backend SpringBoot.
     *
     * @param countCourses - Cantidad de cursos a solicitar
     * @returns Observable que emite un arreglo de {@link Course}
     */
    getAllCoursesSpringBoot(countCourses: number): Observable<Course[]> {
        return this.httpClient.get<Course[]>(`${this.springBootUrl}/courses/${countCourses}`);
    }

    // ---------------------------------------------------------------------
    // Métodos de pedidos locales, Node.js y SpringBoot
    // ---------------------------------------------------------------------
    /**
     * Obtiene el listado de pedidos desde datos locales simulados.
     *
     * @param countOrders - Cantidad de pedidos a solicitar
     * @returns Observable que emite un arreglo de {@link Order}
     */
    getAllOrdersLocal(countOrders: number): Observable<Order[]> {
        return this.generarLocal((faker) => {
            const orders: Order[] = [];
            const statuses: OrderStatus[] = [
                'Pendiente',
                'Enviado',
                'Entregado',
                'Cancelado'
            ];

            for (let i = 1; i <= countOrders; i++) {
                orders.push({
                    id: i,
                    customer: faker.person.fullName(),
                    total: faker.number.int({ min: 10000, max: 500000 }),
                    createdAt: faker.date.recent({ days: 30 }).toISOString(),
                    status: faker.helpers.arrayElement(statuses)
                });
            }
            return orders;
        });
    }

    /**
     * Obtiene el listado de pedidos desde el backend Node.js.
     *
     * @param countOrders - Cantidad de pedidos a solicitar
     * @returns Observable que emite un arreglo de {@link Order}
     */
    getAllOrdersNode(countOrders: number): Observable<Order[]> {
        return this.httpClient.get<Order[]>(`${this.nodeUrl}/orders/${countOrders}`);
    }

    /**
     * Obtiene el listado de pedidos desde el backend SpringBoot.
     *
     * @param countOrders - Cantidad de pedidos a solicitar
     * @returns Observable que emite un arreglo de {@link Order}
     */
    getAllOrdersSpringBoot(countOrders: number): Observable<Order[]> {
        return this.httpClient.get<Order[]>(`${this.springBootUrl}/orders/${countOrders}`);
    }

    // ---------------------------------------------------------------------
    // Métodos de libros locales, Node.js y SpringBoot
    // ---------------------------------------------------------------------
    /**
     * Obtiene el listado de libros desde datos locales simulados.
     *
     * @param countBooks - Cantidad de libros a solicitar
     * @returns Observable que emite un arreglo de {@link Book}
     */
    getAllBooksLocal(countBooks: number): Observable<Book[]> {
        return this.generarLocal((faker) => {
            const books: Book[] = [];
            const genres: BookGenre[] = [
                'Novela',
                'Ciencia',
                'Historia',
                'Tecnologia'
            ];
            const bookTitles: string[] = [
                'Cien años de soledad',
                'Clean Architecture',
                'Breve historia del tiempo',
                'El Quijote',
                'Sapiens',
                'Código limpio',
                'La peste',
                'Cosmos',
                'Los miserables',
                'Estructuras de datos y algoritmos',
                'Historia de Colombia',
                'El origen de las especies'
            ];

            for (let i = 1; i <= countBooks; i++) {
                books.push({
                    id: i,
                    title: faker.helpers.arrayElement(bookTitles),
                    author: faker.person.fullName(),
                    year: faker.number.int({ min: 1950, max: 2025 }),
                    genre: faker.helpers.arrayElement(genres)
                });
            }
            return books;
        });
    }

    /**
     * Obtiene el listado de libros desde el backend Node.js.
     *
     * @param countBooks - Cantidad de libros a solicitar
     * @returns Observable que emite un arreglo de {@link Book}
     */
    getAllBooksNode(countBooks: number): Observable<Book[]> {
        return this.httpClient.get<Book[]>(`${this.nodeUrl}/books/${countBooks}`);
    }

    /**
     * Obtiene el listado de libros desde el backend SpringBoot.
     *
     * @param countBooks - Cantidad de libros a solicitar
     * @returns Observable que emite un arreglo de {@link Book}
     */
    getAllBooksSpringBoot(countBooks: number): Observable<Book[]> {
        return this.httpClient.get<Book[]>(`${this.springBootUrl}/books/${countBooks}`);
    }
}
