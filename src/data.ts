import { Author } from "./entities/Author"
import { Book } from "./entities/Book"
import {getManager} from "typeorm";

const King: string = "Стивен Кинг";
const Roling: string = "Джоан Ролинг";

export async function clearDatabase() {
  var manager = getManager();
  await manager.query("TRUNCATE TABLE book CASCADE;");
  await manager.query("TRUNCATE TABLE author CASCADE;");
}

export async function seedDatabase() 
{
  const authorRepository = getManager().getRepository(Author)
  const bookRepository = getManager().getRepository(Book)
  if ((await authorRepository.find()).length === 0)
  {
    var author1 = new Author();
    author1.name = King;
    await authorRepository.save(author1);
  
    var author2 = new Author();
    author2.name = Roling;
    await authorRepository.save(author2);
  } 
  else
  {
    var author1 = (await authorRepository.findOneOrFail({name: King}))
    var author2 = (await authorRepository.findOneOrFail({name: Roling}))
  }

  if ((await bookRepository.find()).length === 0)
  {
    var book = new Book();
    book.name = "Темная башня";
    book.pageCount = 800;
    book.author = author1;
    await bookRepository.save(book)

    book = new Book();
    book.name = "Гарри Поттер и философский камень";
    book.pageCount = 400;
    book.author = author2;
    await bookRepository.save(book)

    book = new Book();
    book.name = "Гарри Поттер и тайная комната";
    book.pageCount = 450;
    book.author = author2;
    await bookRepository.save(book)

    book = new Book();
    book.name = "Гарри Поттер и узник Азкабана";
    book.pageCount = 500;
    book.author = author2;
    await bookRepository.save(book)
  }
  
}
