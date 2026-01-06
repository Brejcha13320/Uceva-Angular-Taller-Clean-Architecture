
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { USERS_MOCK } from '../../../../mocks/users.mocks';
import { User } from '../../../domain/models/user.model';
import { DataService } from '../../services/data.service';
import { UserLocalRepositoryImpl } from './user-local.repository.impl';

describe('UserLocalRepositoryImpl (Infrastructure)', () => {
  let repository: UserLocalRepositoryImpl;

  const DataServiceMock = { getAllUsersLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            UserLocalRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(UserLocalRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllUsersLocal()', () => {
    const getAllSpy = DataServiceMock.getAllUsersLocal.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de useros como Observable', (done) => {
    DataServiceMock.getAllUsersLocal.mockReturnValue(of(USERS_MOCK))
    repository.getAll().subscribe((users: User[]) => {
      expect(users).toEqual(USERS_MOCK);
      done();
    });
  });
});
