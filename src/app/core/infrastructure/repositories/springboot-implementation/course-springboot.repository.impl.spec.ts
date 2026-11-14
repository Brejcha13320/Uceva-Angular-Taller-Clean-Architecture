import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { COURSES_MOCK } from '../../../../mocks/courses.mocks';
import { Course } from '../../../domain/models/course.model';
import { DataService } from '../../services/data.service';
import { CourseSpringBootRepositoryImpl } from './course-springboot.repository.impl';

describe('CourseSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: CourseSpringBootRepositoryImpl;

  const countCourses = 5;
  const DataServiceMock = {  getAllCoursesSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseSpringBootRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    })
    .compileComponents();
    repository = TestBed.inject(CourseSpringBootRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllCoursesSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllCoursesSpringBoot.mockReturnValue(of([]));
    repository.getAll(countCourses).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countCourses);
  });

  it('debe devolver el listado de cursos como Observable', (done) => {
    DataServiceMock.getAllCoursesSpringBoot.mockReturnValue(of(COURSES_MOCK))
    repository.getAll(countCourses).subscribe((courses: Course[]) => {
      expect(courses).toEqual(COURSES_MOCK);
      done();
    });
  });

});