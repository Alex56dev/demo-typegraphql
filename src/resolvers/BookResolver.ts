import { 
  Arg, 
  FieldResolver, 
  Query, 
  Resolver, 
  Root,
  Ctx,
  Info,
  Mutation
} from "type-graphql";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";
import { CreateBook } from "../inputs/CreateBook";
import { Context } from "graphql-yoga/dist/types";
import { GraphQLResolveInfo } from 'graphql'
import DataLoader from "dataloader";

@Resolver(of => Book)
export default class BookResolver {
  @Query(returns => [Book])
  async fetchBooks(): Promise<Book[]> {
    return (await Book.find());
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

  @FieldResolver()
  async author(
    @Root() book: Book,
    @Ctx() ctx: Context,
    @Info() info: GraphQLResolveInfo
  ): Promise<Author>
  {
    const { dataloaders } = ctx;
    let dl = dataloaders.get(info.fieldNodes)
    if (!dl) {
      dl = new DataLoader(async (ids: any) => {
        const authors = (await Author.findByIds(ids))
        const sortedAuthors = ids.map((id: number) => authors.find(x => x.id === id))

        return sortedAuthors;
      })
      dataloaders.set(info.fieldNodes, dl)
    }
    return dl.load(book.authorId)
  }
}
