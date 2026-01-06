
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { User } from '../../domain/models/user.model';
import { UserService } from '../services/user.service';
import { UserRepositoryImpl } from './user.repository.impl';

describe('UserRepositoryImpl (Infrastructure)', () => {
  let repository: UserRepositoryImpl;

  const UserServiceMock = { getAll: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            UserRepositoryImpl,
            { provide: UserService, useValue: UserServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(UserRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a UserService.getAll()', () => {
    const getAllSpy = UserServiceMock.getAll.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de useros como Observable', (done) => {
    UserServiceMock.getAll.mockReturnValue(of(USERS_MOCK))
    repository.getAll().subscribe((users: User[]) => {
      expect(users).toEqual(USERS_MOCK);
      done();
    });
  });
});
