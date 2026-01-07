
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { USERS_MOCK } from '../../../../mocks/users.mocks';
import { User } from '../../../domain/models/user.model';
import { DataService } from '../../services/data.service';
import { UserNodeRepositoryImpl } from './user-node.repository.impl';

describe('UserNodeRepositoryImpl (Infrastructure)', () => {
  let repository: UserNodeRepositoryImpl;

  const countUsers = 5;
  const DataServiceMock = { getAllUsersNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            UserNodeRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(UserNodeRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllUsersNode()', () => {
    const getAllSpy = DataServiceMock.getAllUsersNode.mockReturnValue(of([]));
    repository.getAll(countUsers).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countUsers);
  });

  it('debe devolver el listado de useros como Observable', (done) => {
    DataServiceMock.getAllUsersNode.mockReturnValue(of(USERS_MOCK))
    repository.getAll(countUsers).subscribe((users: User[]) => {
      expect(users).toEqual(USERS_MOCK);
      done();
    });
  });
});
