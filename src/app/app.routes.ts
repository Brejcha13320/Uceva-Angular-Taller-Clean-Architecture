import { Routes } from '@angular/router';
import { UsersPage } from './presentation/pages/users/users.page';
import { ProductsPage } from './presentation/pages/products/products.page';
import { VehiclesPage } from './presentation/pages/vehicles/vehicles.page';
import { DealershipsPage } from './presentation/pages/dealerships/dealerships.page';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales
 * - Redirección por defecto para rutas no existentes
 *
 * @see {@link UsersPage}
 * @see {@link ProductsPage}
 * @see {@link VehiclesPage}
 */
export const routes: Routes = [

  /**
   * Ruta de usuarios.
   *
   * @remarks
   * Renderiza el componente `UsersPage`, encargado
   * de mostrar y gestionar el listado de usuarios.
   */
  { path: 'users', component: UsersPage },

  /**
   * Ruta de productos.
   *
   * @remarks
   * Renderiza el componente `ProductsPage`, encargado
   * de mostrar y gestionar el listado de productos.
   */
  { path: 'products', component: ProductsPage },

  /**
   * Ruta de vehículos.
   *
   * @remarks
   * Renderiza el componente `VehiclesPage`, encargado
   * de mostrar y gestionar el listado de vehículos.
   */
  { path: 'vehicles', component: VehiclesPage },

  /**
   * Ruta de conseccionarios.
   *
   * @remarks
   * Renderiza el componente `DealershipsPage`, encargado
   * de mostrar y gestionar el listado de conseccionarios.
   */
  { path: 'dealerships', component: DealershipsPage },

  /**
   * Ruta comodín.
   *
   * @remarks
   * Captura cualquier ruta no definida y redirige
   * automáticamente a la ruta de usuarios.
   */
  { path: '**', redirectTo: 'users' },
];
