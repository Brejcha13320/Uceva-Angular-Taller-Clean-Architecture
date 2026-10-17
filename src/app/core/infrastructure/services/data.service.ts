import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { faker } from '@faker-js/faker';
import { Observable, of } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Product, ProductCategory } from "../../domain/models/product.model";
import { User, UserEngineering } from "../../domain/models/user.model";
import { OrderModel } from "../../domain/models/order.model";
import { ORDERS_MOCK } from "../../../mocks/orders.mocks";
import { Category } from "../../domain/models/category.model";

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
 * - Backend Spring Boot mediante HTTP
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
     */
    private httpClient = inject(HttpClient);

    /**
     * URL base del backend Node.js.
     */
    private nodeUrl = `${environment.baseUrlNode}/api`;

    /**
     * URL base del backend SpringBoot.
     */
    private springBootUrl = `${environment.baseUrlSpringBoot}/api`;

    /**
     * Obtiene el listado de USUARIOS desde datos locales simulados.
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link User}
     */
    getAllUsersLocal(countUsers: number): Observable<User[]> {
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

        return of(users);
    }

    /**
     * Obtiene el listado de productos desde datos locales simulados.
     *
     * @param countProducts - Cantidad de productos a solicitar
     * @returns Observable que emite un arreglo de {@link Product}
     */
    getAllProductsLocal(countProducts: number): Observable<Product[]> {
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
        return of(products);
    }

    /**
     * Obtiene el listado de órdenes desde datos locales simulados.
     *
     * @returns Observable que emite un arreglo de {@link OrderModel}
     */
    getAllOrdersLocal(): Observable<OrderModel[]> {
        return of(ORDERS_MOCK);
    }

    /**
     * Obtiene el listado de categorías desde datos locales simulados.
     *
     * @returns Observable que emite un arreglo de {@link Category}
     */
    getAllCategoriesLocal(): Observable<Category[]> {
        const categories: Category[] = [
            { id: 1, name: 'Lácteos', description: 'Productos derivados de la leche como quesos, yogures y mantequilla', active: true },
            { id: 2, name: 'Carnes', description: 'Cortes vacunos, porcinos, aves y embutidos frescos de primera calidad', active: true },
            { id: 3, name: 'Frutas', description: 'Variedad de frutas frescas seleccionadas de temporada y cítricos', active: true },
            { id: 4, name: 'Verduras', description: 'Hortalizas, legumbres y vegetales frescos directos del campo', active: false },
            { id: 5, name: 'Bebidas', description: 'Jugos naturales, aguas minerales, refrescos y bebidas hidratantes', active: true },
        ];
        return of(categories);
    }

    /**
     * Obtiene el listado de usuarios desde el backend Node.js.
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link User}
     */
    getAllUsersNode(countUsers: number): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.nodeUrl}/users/${countUsers}`);
    }

    /**
     * Obtiene el listado de productos desde el backend Node.js.
     *
     * @param countProducts - Cantidad de productos a solicitar
     * @returns Observable que emite un arreglo de {@link Product}
     */
    getAllProductsNode(countProducts: number): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.nodeUrl}/products/${countProducts}`);
    }

    /**
     * Obtiene el listado de órdenes desde el backend Node.js.
     *
     * @returns Observable que emite un arreglo de {@link OrderModel}
     */
    getAllOrdersNode(): Observable<OrderModel[]> {
        return this.httpClient.get<OrderModel[]>(`${this.nodeUrl}/orders`);
    }

    /**
     * Obtiene el listado de categorías desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint `/categories`.
     *
     * @returns Observable que emite un arreglo de {@link Category}
     */
    getAllCategoriesNode(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`${this.nodeUrl}/categories`);
    }

    /**
     * Obtiene el listado de usuarios desde el backend SpringBoot.
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link User}
     */
    getAllUsersSpringBoot(countUsers: number): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.springBootUrl}/users/${countUsers}`);
    }

    /**
     * Obtiene el listado de productos desde el backend SpringBoot.
     *
     * @param countProducts - Cantidad de productos a solicitar
     * @returns Observable que emite un arreglo de {@link Product}
     */
    getAllProductsSpringBoot(countProducts: number): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.springBootUrl}/products/${countProducts}`);
    }

    /**
     * Obtiene el listado de órdenes desde el backend SpringBoot.
     *
     * @returns Observable que emite un arreglo de {@link OrderModel}
     */
    getAllOrdersSpringBoot(): Observable<OrderModel[]> {
        return this.httpClient.get<OrderModel[]>(`${this.springBootUrl}/orders`);
    }

    /**
     * Obtiene el listado de categorías desde el backend SpringBoot.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint `/categories`.
     *
     * @returns Observable que emite un arreglo de {@link Category}
     */
    getAllCategoriesSpringBoot(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`${this.springBootUrl}/categories`);
    }

}
