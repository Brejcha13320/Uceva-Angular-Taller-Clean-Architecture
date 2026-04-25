import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { faker } from '@faker-js/faker';
import { Observable, of } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Product, ProductCategory } from "../../domain/models/product.model";
import { User, UserEngineering } from "../../domain/models/user.model";
import {Vehicle,VehicleCategory} from "../../domain/models/vehicle.model";
import { Dealership, DealershipContinent } from "../../domain/models/dealership.model";

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
     * Obtiene el listado de USUARIOS desde datos locales simulados.
     *
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
     * Obtiene el listado de vehículos desde datos locales simulados.
     *
     * @param countVehicles - Cantidad de vehículos a solicitar
     * @returns Observable que emite un arreglo de {@link Vehicle}
     */
    getAllVehiclesLocal(countVehicles: number): Observable<Vehicle[]> {
        const vehicles: Vehicle[] = [];
        const vehicleCategories: VehicleCategory[] = [
            'Sedan',
            'SUV',
            'Camioneta'
        ];
        for(let i = 1; i <= countVehicles ; i++){
            vehicles.push({
                id: i,
                brand: faker.vehicle.manufacturer(),
                category: faker.helpers.arrayElement(vehicleCategories),
                price:faker.commerce.price({ min: 1000, max: 100000, dec: 0, symbol: '$' }),
                year: faker.number.int({ min: 1990, max: 2026 }),
            })
        }
        return of(vehicles);
    }



    /**
     * Obtiene el listado de concesionarios desde datos locales simulados.
     *
     * @param countDealerships - Cantidad de concesionarios a solicitar
     * @returns Observable que emite un arreglo de {@link Dealership}
     */
    getAllDealershipsLocal(countDealerships: number): Observable<Dealership[]> {
        const dealerships: Dealership[] = [];

        const continents: DealershipContinent[] = [
            'America',
            'Europe',
            'Asia',
            'Africa',
            'Oceania'
        ];
        for(let i = 1; i <= countDealerships ; i++){
            dealerships.push({
                id: i,
                name: faker.company.name(),
                location: faker.location.city(),
                continent: faker.helpers.arrayElement(continents),
            })
        }
        return of(dealerships);
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

    /**
     * Obtiene el listado de vehículos desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/vehicles/{countVehicles}`.
     *
     * @param countVehicles - Cantidad de vehículos a solicitar
     * @returns Observable que emite un arreglo de {@link Vehicle}
     *
     * @example
     * ```ts
     * this.dataService.getAllVehiclesNode(5).subscribe(vehicles => {
     *   console.log(vehicles);
     * });
     * ```
     */
    getAllVehiclesNode(countVehicles: number): Observable<Vehicle[]> {
        return this.httpClient.get<Vehicle[]>(`${this.nodeUrl}/vehicles/${countVehicles}`);
    }




/**
     * Obtiene el listado de concesionarios desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/dealerships/{countDealerships}`.
     *
     * @param countDealerships - Cantidad de concesionarios a solicitar
     * @returns Observable que emite un arreglo de {@link Dealership}
     *
     * @example
     * ```ts
     * this.dataService.getAllDealershipsNode(5).subscribe(dealerships => {
     *   console.log(dealerships);
     * });
     * ```
     */
    getAllDealershipsNode(countDealerships: number): Observable<Dealership[]> {
        return this.httpClient.get<Dealership[]>(`${this.nodeUrl}/dealerships/${countDealerships}`);
    }


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

/**
     * Obtiene el listado de vehículos desde el backend SpringBoot.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/vehicles/{countVehicles}`.
     *
     * @param countVehicles - Cantidad de vehículos a solicitar
     * @returns Observable que emite un arreglo de {@link Vehicle}
     *
     * @example
     * ```ts
     * this.dataService.getAllVehiclesSpringBoot(5).subscribe(vehicles => {
     *   console.log(vehicles);
     * });
     * ```
     */
    getAllVehiclesSpringBoot(countVehicles: number): Observable<Vehicle[]> {
        return this.httpClient.get<Vehicle[]>(`${this.springBootUrl}/vehicles/${countVehicles}`);
    }

/**
     * Obtiene el listado de concesionarios desde el backend SpringBoot.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/dealerships/{countDealerships}`.
     *
     * @param countDealerships - Cantidad de concesionarios a solicitar
     * @returns Observable que emite un arreglo de {@link Dealership}
     *
     * @example
     * ```ts
     * this.dataService.getAllDealershipsSpringBoot(5).subscribe(dealerships => {
     *   console.log(dealerships);
     * });
     * ```
     */
    getAllDealershipsSpringBoot(countDealerships: number): Observable<Dealership[]> {
        return this.httpClient.get<Dealership[]>(`${this.springBootUrl}/dealerships/${countDealerships}`);
    }

}
