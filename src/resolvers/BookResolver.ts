import { 
  Arg, 
  FieldResolver, 
  Query, 
  Resolver, 
  Root,
  Mutation
} from "type-graphql";
import { Book } from "../entities/Book";
import { CreateBook } from "../inputs/CreateBook";

@Resolver(of => Book)
export default class BookResolver {
  @Query(returns => [Book])
  async fetchBooks(): Promise<Book[]> {
    return (await Book.find());
  }

  // @Query(returns => [Book])
  // booksByAuthor(@Arg('author_name') author_name: string): BookData[]
  // {    
  //   var author: AuthorData = authors.filter(author => {
  //     return author.name === author_name;
  //   })[0];

  //   return books.filter(book => {
  //     return book.authorId === author.authorId;
  //   })
  // }

  // @Mutation(returns => Book)
  // createBook(@Arg("data") createBookData: CreateBook): BookData
  // {
  //     var findBooks = books.filter(book => {
  //       return book.bookId === createBookData.bookId;
  //     })
  //     if (findBooks.length > 0) {
  //       throw new Error("Книга с таким bookId уже существует");
  //     }

  //     books.push(createBookData)

  //     return createBookData;
  // }


  // @FieldResolver()
  // author(@Root() bookData: BookData) {
  //   return authors.filter(author => {
  //     return author.authorId === bookData.authorId;
  //   })[0];
  // }
}
