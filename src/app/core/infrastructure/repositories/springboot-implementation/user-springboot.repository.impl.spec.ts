
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { USERS_MOCK } from '../../../../mocks/users.mocks';
import { User } from '../../../domain/models/user.model';
import { DataService } from '../../services/data.service';
import { UserSpringBootRepositoryImpl } from './user-springboot.repository.impl';

describe('UserSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: UserSpringBootRepositoryImpl;

  const countUsers = 5;
  const DataServiceMock = { getAllUsersSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            UserSpringBootRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(UserSpringBootRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllUsersSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllUsersSpringBoot.mockReturnValue(of([]));
    repository.getAll(countUsers).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countUsers);
  });

  it('debe devolver el listado de useros como Observable', (done) => {
    DataServiceMock.getAllUsersSpringBoot.mockReturnValue(of(USERS_MOCK))
    repository.getAll(countUsers).subscribe((users: User[]) => {
      expect(users).toEqual(USERS_MOCK);
      done();
    });
  });
});
