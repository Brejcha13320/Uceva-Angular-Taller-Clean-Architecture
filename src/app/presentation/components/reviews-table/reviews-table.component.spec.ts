import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewsTableComponent } from './reviews-table.component';
import { REVIEWS_MOCKS } from '../../../mocks/reviews.mocks';

describe('ReviewsTableComponent', () => {
  let component: ReviewsTableComponent;
  let fixture: ComponentFixture<ReviewsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería ser creado correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con un array vacío', () => {
    expect(component.reviews).toEqual([]);
  });

  it('debería mostrar las reseñas pasadas como entrada', () => {
    component.reviews = REVIEWS_MOCKS;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(REVIEWS_MOCKS.length);
  });

  it('debería mostrar los datos correctos de las reseñas', () => {
    component.reviews = [REVIEWS_MOCKS[0]];
    fixture.detectChanges();

    const firstRow = fixture.nativeElement.querySelector('tbody tr');
    const cells = firstRow.querySelectorAll('td');

    expect(cells[0].textContent).toContain(REVIEWS_MOCKS[0].id.toString());
    expect(cells[1].textContent).toContain(REVIEWS_MOCKS[0].userId.toString());
    expect(cells[2].textContent).toContain(REVIEWS_MOCKS[0].productId.toString());
    expect(cells[4].textContent).toContain(REVIEWS_MOCKS[0].comment);
  });
});
