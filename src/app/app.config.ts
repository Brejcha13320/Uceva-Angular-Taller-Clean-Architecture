import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProductRepository } from './core/domain/repositories/product.repository';
import { UserRepository } from './core/domain/repositories/user.repository';
import { CourseRepository } from './core/domain/repositories/course.repository';
import { OrderRepository } from './core/domain/repositories/order.repository';
import { BookRepository } from './core/domain/repositories/book.repository';
import { ProductNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/product-node.repository.impl';
import { UserNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/user-node.repository.impl';
import { CourseNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/course-node.repository.impl';
import { OrderNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/order-node.repository.impl';
import { BookNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/book-node.repository.impl';
import { UserSpringBootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/user-springboot.repository.impl';
import { CourseSpringBootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/course-springboot.repository.impl';
import { ProductSpringBootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/product-springboot.repository.impl';
import { OrderSpringBootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/order-springboot.repository.impl';
import { BookSpringBootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/book-springboot.repository.impl';
import { UserLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/user-local.repository.impl';
import { CourseLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/course-local.repository.impl';
import { ProductLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/product-local.repository.impl';
import { OrderLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/order-local.repository.impl';
import { BookLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/book-local.repository.impl';

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

    //Local Providers
    { provide: UserRepository, useClass: UserLocalRepositoryImpl },
    { provide: ProductRepository, useClass: ProductLocalRepositoryImpl },
    { provide: CourseRepository, useClass: CourseLocalRepositoryImpl },
    { provide: OrderRepository, useClass: OrderLocalRepositoryImpl },
    { provide: BookRepository, useClass: BookLocalRepositoryImpl },

    //Node Providers
    //{ provide: UserRepository, useClass: UserNodeRepositoryImpl },
    //{ provide: ProductRepository, useClass: ProductNodeRepositoryImpl },
    //{ provide: CourseRepository, useClass: CourseNodeRepositoryImpl },
    //{ provide: OrderRepository, useClass: OrderNodeRepositoryImpl },
    //{ provide: BookRepository, useClass: BookNodeRepositoryImpl },

    //SpringBoot Providers
    //{ provide: UserRepository, useClass: UserSpringBootRepositoryImpl },
    //{ provide: ProductRepository, useClass: ProductSpringBootRepositoryImpl },
    //{ provide: CourseRepository, useClass: CourseSpringBootRepositoryImpl },
    //{ provide: OrderRepository, useClass: OrderSpringBootRepositoryImpl },
    //{ provide: BookRepository, useClass: BookSpringBootRepositoryImpl },

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
  ],
};