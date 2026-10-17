import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { ORDERS_MOCK } from '../../../mocks/orders.mocks';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { GetAllOrdersUseCase } from './get-all-orders.usecase';

describe('GetAllOrdersUseCase', () => {
  let useCase: GetAllOrdersUseCase;

  const OrderRepositoryMock: jest.Mocked<OrderRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetAllOrdersUseCase,
        { provide: OrderRepository, useValue: OrderRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetAllOrdersUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllOrdersUseCase);
  });

  it('debería delegar la llamada al repositorio y retornar las órdenes', async () => {
    OrderRepositoryMock.getAll.mockReturnValue(of(ORDERS_MOCK));
    const result = await firstValueFrom(useCase.execute());
    expect(OrderRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(ORDERS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un fallo', async () => {
    const errorMessage = 'Fallo en la búsqueda de órdenes';
    OrderRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result$ = useCase.execute();
    await expect(firstValueFrom(result$)).rejects.toThrow(errorMessage);
    expect(OrderRepositoryMock.getAll).toHaveBeenCalledTimes(1);
  });
});
