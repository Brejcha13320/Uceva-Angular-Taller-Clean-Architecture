import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllUsersUseCase } from '../../../core/application/usecases/get-all-users.usecase';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { UsersTableComponent } from '../../components/users-table/users-table.component';
import { UsersPage } from './users.page';

describe('UsersPage', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;

  const GetAllUsersUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPage, UsersTableComponent],
    })
    .overrideComponent(UsersPage, {
      set: {
        providers: [
          { provide: GetAllUsersUseCase, useValue:GetAllUsersUseCaseMock }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.users).toEqual([]);
  });

  it('debe cargar los productos y cambiar el estado a success', () => {
    GetAllUsersUseCaseMock.execute.mockReturnValue(of(USERS_MOCK));
    fixture.detectChanges();
    expect(component.users).toEqual(USERS_MOCK);
    expect(component.state).toBe('success');
  });

  it('no deberia cargar los productos y cambiar el estado a error', () => {
    GetAllUsersUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    expect(component.users).toEqual([]);
    expect(component.state).toBe('error');
  });

});
