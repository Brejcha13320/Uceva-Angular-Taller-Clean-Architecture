import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReviewsPage } from './reviews.page';
import { GetAllReviewsUseCase } from '../../../core/application/usecases/get-all-reviews.usecase';
import { ReviewRepository } from '../../../core/domain/repositories/review.repository';
import { REVIEWS_MOCKS } from '../../../mocks/reviews.mocks';
import { of } from 'rxjs';

describe('ReviewsPage', () => {
  let component: ReviewsPage;
  let fixture: ComponentFixture<ReviewsPage>;

  beforeEach(async () => {
    const reviewRepositoryMock = {
      getAll: jest.fn().mockReturnValue(of(REVIEWS_MOCKS))
    };

    await TestBed.configureTestingModule({
      imports: [ReviewsPage],
      providers: [
        GetAllReviewsUseCase,
        { provide: ReviewRepository, useValue: reviewRepositoryMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsPage);
    component = fixture.componentInstance;
  });

  it('debería ser creado correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con estado "init" y array vacío', () => {
    expect(component.state).toBe('init');
    expect(component.reviews).toEqual([]);
  });

  it('debería cargar las reseñas y cambiar el estado a success', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.reviews.length).toBeGreaterThan(0);
      expect(component.state).toBe('success');
      done();
    }, 100);
  });
});
