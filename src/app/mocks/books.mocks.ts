import { Book } from "../core/domain/models/book.model";

export const BOOKS_MOCK: Book[] = [
    {
        id: 1,
        title: 'Cien años de soledad',
        author: 'Gabriel García Márquez',
        year: 1967,
        genre: 'Novela'
    },
    {
        id: 2,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        year: 2008,
        genre: 'Tecnologia'
    }
];
