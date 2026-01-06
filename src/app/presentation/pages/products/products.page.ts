import { Component, inject } from '@angular/core';
import { GetAllProductsUseCase } from '../../../core/application/usecases/get-all-products.usecase';
import { Product } from '../../../core/domain/models/product.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Componente contenedor de productos.
 *
 * Se utiliza para gestionar y mostrar un listado de productos
 * utilizando el componente `ProductsTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `ProductsService`
 * para obtener los productos y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 *
 */
@Component({
  selector: 'app-producs',
  templateUrl: `./products.page.html`,
  imports: [ProductsTableComponent, AlertComponent],
  providers: [GetAllProductsUseCase]
})
export class ProductsPage {
  /**
   * Listado de productos obtenidos desde el servicio.
   * @type {Product[]}
   */
  products: Product[] = [];
  /**
     * Estado actual del componente.
     *
     * @default 'init'
     */
    state: State = 'init';
  

  /**
   * Caso de Uso para obtener productos.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllProductsUseCase = inject(GetAllProductsUseCase);

  /**
   * Inicializa el componente y carga los productos.
   * @remarks
   * Se suscribe al método `execute()` del caso de uso y
   * asigna los datos recibidos a la propiedad `products`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllProductsUseCase.execute().subscribe({
      next: (products) => {
        this.products = products;
        this.state = 'success';
      },
      error: (error) => {
        this.state = 'error';
      },
    })
  }
}
