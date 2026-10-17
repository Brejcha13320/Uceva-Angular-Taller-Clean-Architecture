import { Component, inject, OnInit } from '@angular/core';
import { GetAllCategoriesUseCase } from '../../../core/application/usecases/get-all-categories.usecase';
import { Category } from '../../../core/domain/models/category.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { CategoriesTableComponent } from '../../components/categories-table/categories-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Componente de página para la gestión y visualización de categorías.
 *
 * @description
 * Componente contenedor (Smart Component) que orquesta la obtención de datos
 * consumiendo exclusivamente el caso de uso `GetAllCategoriesUseCase`.
 * Administra el ciclo de vida de la petición mediante el tipo `State`.
 *
 * @architecture Clean Architecture
 * @layer Presentation
 */
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  imports: [CategoriesTableComponent, AlertComponent],
  providers: [GetAllCategoriesUseCase]
})
export class CategoriesPage implements OnInit {
  /**
   * Colección de categorías obtenidas desde el caso de uso.
   * @type {Category[]}
   */
  categories: Category[] = [];

  /**
   * Estado asíncrono actual de la página.
   * @type {State}
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Caso de uso para obtener el listado de categorías inyectado.
   */
  private getAllCategoriesUseCase = inject(GetAllCategoriesUseCase);

  /**
   * Inicializa el componente solicitando las categorías al caso de uso.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllCategoriesUseCase.execute().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }
}
