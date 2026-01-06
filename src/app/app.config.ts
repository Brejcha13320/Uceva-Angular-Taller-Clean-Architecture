import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProductRepository } from './core/domain/repositories/product.repository';
import { UserRepository } from './core/domain/repositories/user.repository';
import { ProductService } from './core/infrastructure/services/product.service';
import { UserService } from './core/infrastructure/services/user.service';
import { UserRepositoryImpl } from './core/infrastructure/repositories/user.repository.impl';
import { ProductRepositoryImpl } from './core/infrastructure/repositories/product.repository.impl';

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

    /**
     * Provider del repositorio de usuarios.
     *
     * @remarks
     * Este provider registra la implementación concreta
     * {@link UserRepositoryImpl} como adaptador del contrato
     * {@link UserRepository} definido en la capa de dominio.
     *
     * Gracias a este provider:
     * - Los casos de uso dependen únicamente del contrato
     * - La infraestructura puede cambiar sin afectar al dominio
     *
     * Este binding representa el punto de integración entre:
     * - Dominio (Repository abstracto)
     * - Infrastructure (RepositoryImpl)
     *
     * @see {@link UserRepository}
     * @see {@link UserRepositoryImpl}
     */
    { provide: UserRepository, useClass: UserRepositoryImpl },

    /**
     * Provider del repositorio de productos.
     *
     * @remarks
     * Registra {@link ProductRepositoryImpl} como la
     * implementación concreta del contrato
     * {@link ProductRepository}.
     *
     * Este patrón permite:
     * - Inversión de dependencias
     * - Sustitución transparente de la fuente de datos
     * - Facilitar pruebas unitarias mediante mocks
     *
     * Es el único lugar donde el dominio
     * conoce qué implementación se utiliza.
     *
     * @see {@link ProductRepository}
     * @see {@link ProductRepositoryImpl}
     */
    { provide: ProductRepository, useClass: ProductRepositoryImpl },

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
  ]
};