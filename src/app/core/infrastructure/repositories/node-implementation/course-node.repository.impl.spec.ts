import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { COURSES_MOCK } from '../../../../mocks/courses.mocks';
import { Course } from '../../../domain/models/course.model';
import { DataService } from '../../services/data.service';
import { CourseNodeRepositoryImpl } from './course-node.repository.impl';

describe('CourseNodeRepositoryImpl (Infrastructure)', () => {
  let repository: CourseNodeRepositoryImpl;

  const countCourses = 5;
  const DataServiceMock = { getAllCoursesNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseNodeRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    })
    .compileComponents();
    repository = TestBed.inject(CourseNodeRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllCoursesNode()', () => {
    const getAllSpy = DataServiceMock.getAllCoursesNode.mockReturnValue(of([]));
    repository.getAll(countCourses).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countCourses);
  });

  it('debe devolver el listado de cursos como Observable', (done) => {
    DataServiceMock.getAllCoursesNode.mockReturnValue(of(COURSES_MOCK));
    repository.getAll(countCourses).subscribe((courses: Course[]) => {
      expect(courses).toEqual(COURSES_MOCK);
      done();
    });
  });

});