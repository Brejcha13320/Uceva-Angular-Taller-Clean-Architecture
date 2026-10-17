import { Routes } from '@angular/router';
import { UsersPage } from './presentation/pages/users/users.page';
import { ProductsPage } from './presentation/pages/products/products.page';
import { OrdersPage } from './presentation/pages/orders/orders.page';
import { CategoriesPage } from './presentation/pages/categories/categories.page';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales (usuarios, productos, órdenes, categorías)
 * - Redirección por defecto para rutas no existentes
 *
 * @see {@link UsersPage}
 * @see {@link ProductsPage}
 * @see {@link OrdersPage}
 * @see {@link CategoriesPage}
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
   * Ruta de órdenes.
   *
   * @remarks
   * Renderiza el componente `OrdersPage`, encargado
   * de mostrar y gestionar el listado de órdenes de compra.
   */
  { path: 'orders', component: OrdersPage },

  /**
   * Ruta de categorías.
   *
   * @remarks
   * Renderiza el componente `CategoriesPage`, encargado
   * de mostrar y gestionar el listado de categorías de productos.
   */
  { path: 'categories', component: CategoriesPage },

  /**
   * Ruta comodín.
   *
   * @remarks
   * Captura cualquier ruta no definida y redirige
   * automáticamente a la ruta de usuarios.
   */
  { path: '**', redirectTo: 'users' },
];
