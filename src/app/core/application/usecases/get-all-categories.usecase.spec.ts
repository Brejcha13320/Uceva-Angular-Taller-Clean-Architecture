import { TestBed } from "@angular/core/testing";
import { GetAllCategoriesUseCase } from "./get-all-categories.usecase";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { firstValueFrom, of, throwError } from "rxjs";
import { CATEGORIES_MOCK } from "../../../mocks/categories.mocks";

describe('GetAllCategoriesUseCase', () => {
  let useCase: GetAllCategoriesUseCase;

  const CategoryRepositoryMock: jest.Mocked<CategoryRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetAllCategoriesUseCase,
        { provide: CategoryRepository, useValue: CategoryRepositoryMock }
      ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllCategoriesUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllCategoriesUseCase);
  });

  it('debería delegar la llamada del repository', async () => {
    CategoryRepositoryMock.getAll.mockReturnValue(of(CATEGORIES_MOCK));
    const result = await firstValueFrom(useCase.execute());
    expect(CategoryRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(CATEGORIES_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la búsqueda de categorías';
    CategoryRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result = useCase.execute();
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);
    expect(CategoryRepositoryMock.getAll).toHaveBeenCalledTimes(1);
  });
});
