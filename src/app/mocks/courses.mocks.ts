import { Course } from "../core/domain/models/course.model";

export const COURSES_MOCK: Course[] = [
    {
        id: 1,
        name: 'Bases de Datos',
        credits: 3,
        teacher: 'Carlos Gómez',
        faculty: 'Ingenieria'
    },
    {
        id: 2,
        name: 'Cálculo Diferencial',
        credits: 4,
        teacher: 'Laura Martínez',
        faculty: 'Ciencias'
    }
];