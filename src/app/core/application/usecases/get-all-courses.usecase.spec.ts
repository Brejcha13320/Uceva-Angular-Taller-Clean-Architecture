import { TestBed } from "@angular/core/testing";
import { GetAllCoursesUseCase } from "./get-all-courses.usecase";
import { CourseRepository } from "../../domain/repositories/course.repository";
import { firstValueFrom, of, throwError } from "rxjs";
import { COURSES_MOCK } from "../../../mocks/courses.mocks";


describe('GetAllCoursesUseCase', () => {
  let useCase: GetAllCoursesUseCase;

  const countCourses = 5;
  const CourseRepositoryMock: jest.Mocked<CourseRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetAllCoursesUseCase,
            { provide: CourseRepository, useValue: CourseRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllCoursesUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllCoursesUseCase);
  });

  it('debería delegar la llamada del repository', async () => {
    CourseRepositoryMock.getAll.mockReturnValue(of(COURSES_MOCK));
    const result = await firstValueFrom(useCase.execute(countCourses));
    expect(CourseRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(CourseRepositoryMock.getAll).toHaveBeenCalledWith(countCourses);
    expect(result).toEqual(COURSES_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de cursos';
    CourseRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result = useCase.execute(countCourses);
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);
    expect(CourseRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(CourseRepositoryMock.getAll).toHaveBeenCalledWith(countCourses);
  });

});