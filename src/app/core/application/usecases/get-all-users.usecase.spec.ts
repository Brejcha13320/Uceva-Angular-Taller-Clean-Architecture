import { TestBed } from "@angular/core/testing";
import { GetAllUsersUseCase } from "./get-all-users.usecase";
import { UserRepository } from "../../domain/repositories/user.repository";
import { firstValueFrom, of, throwError } from "rxjs";
import { USERS_MOCK } from "../../../mocks/users.mocks";


describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;

  const UserRepositoryMock: jest.Mocked<UserRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetAllUsersUseCase,
            { provide: UserRepository, useValue: UserRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllUsersUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllUsersUseCase);
  });

  it('debería delegar la llamada del repository', async () => {
    UserRepositoryMock.getAll.mockReturnValue(of(USERS_MOCK));
    const result = await firstValueFrom(useCase.execute());
    expect(UserRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(USERS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de useros';
    UserRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result = useCase.execute();
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);
    expect(UserRepositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

});
