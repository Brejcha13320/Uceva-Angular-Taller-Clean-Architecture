import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProductRepository } from './core/domain/repositories/product.repository';
import { UserRepository } from './core/domain/repositories/user.repository';
import { OrderRepository } from './core/domain/repositories/order.repository';
import { CategoryRepository } from './core/domain/repositories/category.repository';
import { ProductNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/product-node.repository.impl';
import { UserNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/user-node.repository.impl';
import { OrderNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/order-node.repository.impl';
import { CategoryNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/category-node.repository.impl';
import { UserSpringBootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/user-springboot.repository.impl';
import { ProductSpringBootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/product-springboot.repository.impl';
import { OrderSpringBootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/order-springboot.repository.impl';
import { CategorySpringBootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/category-springboot.repository.impl';
import { UserLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/user-local.repository.impl';
import { ProductLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/product-local.repository.impl';
import { OrderLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/order-local.repository.impl';
import { CategoryLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/category-local.repository.impl';

/**
 * Configuración principal de la aplicación Angular.
 *
 * @remarks
 * Este objeto define los *providers* globales utilizados
 * en el arranque de la aplicación mediante la API
 * `bootstrapApplication`.
 *
 * Incluye:
 * - Manejo global de errores del navegador
 * - Configuración de detección de cambios
 * - Sistema de enrutamiento
 * - Cliente HTTP con interceptores
 * - Proveedores de repositorios Clean Architecture intercambiables
 *
 * @see {@link bootstrapApplication}
 */
export const appConfig: ApplicationConfig = {

  /**
   * Proveedores globales de la aplicación.
   *
   * @remarks
   * Se registran servicios y configuraciones esenciales
   * que estarán disponibles en toda la aplicación.
   */
  providers: [

    // Local Providers
    { provide: UserRepository, useClass: UserLocalRepositoryImpl },
    { provide: ProductRepository, useClass: ProductLocalRepositoryImpl },
    //{ provide: OrderRepository, useClass: OrderLocalRepositoryImpl },
    //{ provide: CategoryRepository, useClass: CategoryLocalRepositoryImpl },

    // Node Providers
    //{ provide: UserRepository, useClass: UserNodeRepositoryImpl },
    //{ provide: ProductRepository, useClass: ProductNodeRepositoryImpl },
    { provide: OrderRepository, useClass: OrderNodeRepositoryImpl },
    { provide: CategoryRepository, useClass: CategoryNodeRepositoryImpl },

    // SpringBoot Providers
    //{ provide: UserRepository, useClass: UserSpringBootRepositoryImpl },
    //{ provide: ProductRepository, useClass: ProductSpringBootRepositoryImpl },
    //{ provide: OrderRepository, useClass: OrderSpringBootRepositoryImpl },
    //{ provide: CategoryRepository, useClass: CategorySpringBootRepositoryImpl },

    /**
     * Proveedor de listeners globales de errores del navegador.
     *
     * @remarks
     * Captura errores no controlados y eventos globales,
     * permitiendo un manejo centralizado de excepciones.
     */
    provideBrowserGlobalErrorListeners(),

    /**
     * Configuración de la detección de cambios basada en Zone.js.
     *
     * @remarks
     * `eventCoalescing: true` agrupa múltiples eventos en un
     * solo ciclo de detección de cambios, mejorando
     * el rendimiento de la aplicación.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Proveedor del sistema de enrutamiento.
     *
     * @remarks
     * Registra las rutas definidas en `routes`
     * para la navegación de la aplicación.
     *
     * @see {@link routes}
     */
    provideRouter(routes),

    provideHttpClient(),
  ]
};
