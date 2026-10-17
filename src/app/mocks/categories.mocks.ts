import { Category } from "../core/domain/models/category.model";

/**
 * Mock de datos de categorías para pruebas unitarias.
 *
 * @remarks
 * Proporciona un conjunto representativo de categorías
 * para validar casos de uso, repositorios y componentes de UI.
 */
export const CATEGORIES_MOCK: Category[] = [
  {
    id: 1,
    name: 'Lácteos',
    description: 'Productos derivados de la leche como quesos, yogures y mantequilla',
    active: true,
  },
  {
    id: 2,
    name: 'Carnes',
    description: 'Cortes vacunos, porcinos, aves y embutidos frescos de primera calidad',
    active: true,
  },
  {
    id: 3,
    name: 'Frutas',
    description: 'Variedad de frutas frescas seleccionadas de temporada y cítricos',
    active: true,
  },
  {
    id: 4,
    name: 'Verduras',
    description: 'Hortalizas, legumbres y vegetales frescos directos del campo',
    active: false,
  },
  {
    id: 5,
    name: 'Bebidas',
    description: 'Jugos naturales, aguas minerales, refrescos y bebidas hidratantes',
    active: true,
  },
];
