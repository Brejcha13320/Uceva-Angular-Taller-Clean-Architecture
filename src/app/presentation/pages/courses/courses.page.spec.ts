import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllCoursesUseCase } from '../../../core/application/usecases/get-all-courses.usecase';
import { COURSES_MOCK } from '../../../mocks/courses.mocks';
import { CoursesTableComponent } from '../../components/courses-table/courses-table.component';
import { CoursesPage } from './courses.page';

describe('CoursesPage', () => {
  let component: CoursesPage;
  let fixture: ComponentFixture<CoursesPage>;

  const GetAllCoursesUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesPage, CoursesTableComponent],
    })
    .overrideComponent(CoursesPage, {
      set: {
        providers: [
          { provide: GetAllCoursesUseCase, useValue: GetAllCoursesUseCaseMock }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.courses).toEqual([]);
  });

  it('debe cargar los cursos y cambiar el estado a success', () => {
    GetAllCoursesUseCaseMock.execute.mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    expect(component.courses).toEqual(COURSES_MOCK);
    expect(component.state).toBe('success');
  });

  it('no deberia cargar los cursos y cambiar el estado a error', () => {
    GetAllCoursesUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    expect(component.courses).toEqual([]);
    expect(component.state).toBe('error');
  });

  it('debería solicitar 10 cursos al ejecutar el caso de uso', () => {
    fixture.detectChanges(); // triggers ngOnInit
    expect(GetAllCoursesUseCaseMock.execute).toHaveBeenCalledWith(10);
  });

});