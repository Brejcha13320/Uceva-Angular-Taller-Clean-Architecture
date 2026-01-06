import { UserService } from './user.service';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { User } from '../../domain/models/user.model';

describe('UserService (Infrastructure)', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe devolver el listado de usuarios como Observable', (done) => {
    service.getAll().subscribe((users: User[]) => {
      expect(users).toEqual(USERS_MOCK);
      done();
    });
  });
});