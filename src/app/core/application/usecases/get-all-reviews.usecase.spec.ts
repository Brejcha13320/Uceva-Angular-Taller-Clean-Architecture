import { TestBed } from "@angular/core/testing";
import { GetAllReviewsUseCase } from "./get-all-reviews.usecase";
import { ReviewRepository } from "../../domain/repositories/review.repository";
import { firstValueFrom, of, throwError } from "rxjs";
import { REVIEWS_MOCKS } from "../../../mocks/reviews.mocks";


describe('GetAllReviewsUseCase', () => {
  let useCase: GetAllReviewsUseCase;

  const ReviewRepositoryMock: jest.Mocked<ReviewRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetAllReviewsUseCase,
            { provide: ReviewRepository, useValue: ReviewRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllReviewsUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllReviewsUseCase);
  });

  it('debería delegar la llamada al repository y retornar las reseñas', async () => {
    ReviewRepositoryMock.getAll.mockReturnValue(of(REVIEWS_MOCKS));
    const result = await firstValueFrom(useCase.execute());
    expect(ReviewRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(REVIEWS_MOCKS);
  });

  it('debería retornar un array vacío cuando no hay reseñas', async () => {
    ReviewRepositoryMock.getAll.mockReturnValue(of([]));
    const result = await firstValueFrom(useCase.execute());
    expect(ReviewRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Falló la búsqueda de reseñas';
    ReviewRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result = useCase.execute();
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);
    expect(ReviewRepositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

});
