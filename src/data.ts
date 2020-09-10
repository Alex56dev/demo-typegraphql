export interface BookData {
  bookId: number;
  name: string;
  pageCount: number;
  authorId: number;
}

export interface AuthorData {
  authorId: number;
  name: string;
}

export const books: BookData[] = [
  { bookId: 1, name: "Темная башня", pageCount: 800, authorId: 1 },
  { bookId: 2, name: "Гарри Поттер и философский камень", pageCount: 400, authorId: 2 },
  { bookId: 3, name: "Гарри Поттер и тайная комната", pageCount: 450, authorId: 2 },
  { bookId: 4, name: "Гарри Поттер и узник Азкабана", pageCount: 500, authorId: 2 },
];

export const authors: AuthorData[] = [
  { authorId: 1, name: "Стивен Кинг" },
  { authorId: 2, name: "Джоан Ролинг" }
];
