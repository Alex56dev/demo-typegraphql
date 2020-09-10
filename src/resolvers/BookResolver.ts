import { 
  Arg, 
  FieldResolver, 
  Query, 
  Resolver, 
  Root,
  Mutation
} from "type-graphql";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";
import { CreateBook } from "../inputs/CreateBook";
import {Like} from "typeorm";

@Resolver(of => Book)
export default class BookResolver {
  @Query(returns => [Book])
  async fetchBooks(): Promise<Book[]> {
    return (await Book.getRepository()
      .find({relations: ["author"]})  
    );
  }

  @Query(returns => [Book])
  async booksByAuthor(@Arg('author_name') author_name: string): Promise<Book[]>
  {    
    return (await Book.getRepository().createQueryBuilder("book")
      .leftJoinAndSelect("book.author", "author")
      .where("author.name ilike :name", { name: `%${author_name}%` })
      .getMany()
    );
  }

  @Mutation(returns => Book)
  async createBook(@Arg("data") createBookData: CreateBook): Promise<Book>
  {
      var book = new Book();
      book.name = createBookData.name;
      book.pageCount = createBookData.pageCount;
      book.authorId = createBookData.authorId;
      await book.save();
      await book.reload(); // чтобы обработалась связь с автором

      return book;
  }
}
