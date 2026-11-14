import { TestBed } from "@angular/core/testing";
import { CourseLocalRepositoryImpl } from "./course-local.repository.impl";
import { DataService } from "../../services/data.service";
import { CourseRepository } from "../../../domain/repositories/course.repository";
import { of } from "rxjs";
import { Course } from "../../../domain/models/course.model";
import { COURSES_MOCK } from '../../../../mocks/courses.mocks';

describe('CourseLocalRepositoryImpl (Infrastructure)', () => {
  let repository: CourseLocalRepositoryImpl;
  let dataServiceMock: jest.Mocked<DataService>;

  const countCourses = 5;
  const DataServiceMock = { getAllCoursesLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseLocalRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    });
    repository = TestBed.inject(CourseLocalRepositoryImpl);
    dataServiceMock = TestBed.inject(DataService) as jest.Mocked<DataService>;
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeInstanceOf(CourseLocalRepositoryImpl);
  });

  it('debe delegar la llamada a DataService.getAllCoursesLocal()', () => {
    dataServiceMock.getAllCoursesLocal.mockReturnValue(of([]));
    repository.getAll(countCourses).subscribe();
    expect(dataServiceMock.getAllCoursesLocal).toHaveBeenCalledTimes(1);
    expect(dataServiceMock.getAllCoursesLocal).toHaveBeenCalledWith(countCourses);
  });

  it('debe devolver el listado de cursos como Observable', () => {
    dataServiceMock.getAllCoursesLocal.mockReturnValue(of(COURSES_MOCK));
    let result: Course[] | undefined;
    repository.getAll(countCourses).subscribe((courses) => {
      result = courses;
    });
    expect(result).toEqual(COURSES_MOCK);
  });

});