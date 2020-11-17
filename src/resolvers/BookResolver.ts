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
import { getConnection, Repository } from "typeorm"
import { BookRepository } from "../repositories/BookRepository";

@Resolver(of => Book)
export default class BookResolver {
  private bookRepository: BookRepository;

  private authorRepository: Repository<Author>;

  constructor() {
    this.bookRepository = getConnection().getCustomRepository(BookRepository)
    this.authorRepository = getConnection().getRepository(Author)
  }

  @Query(returns => [Book])
  async fetchBooks(): Promise<Book[]> {
    return (await this.bookRepository.find());
  }

  @Query(returns => [Book])
  async booksByAuthor(@Arg('author_name') authorName: string): Promise<Book[]>
  {
    return this.bookRepository.findBooksByAuthorName(authorName);
  }

  @Mutation(returns => Book)
  async createBook(@Arg("data") createBookData: CreateBook): Promise<Book>
  {
      const book = new Book();
      book.name = createBookData.name;
      book.pageCount = createBookData.pageCount;
      book.authorId = createBookData.authorId;
      await this.bookRepository.save(book)

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
        const authors = (await this.authorRepository.findByIds(ids))
        const sortedAuthors = ids.map((id: number) => authors.find(x => x.id === id))

        return sortedAuthors;
      })
      dataloaders.set(info.fieldNodes, dl)
    }
    return dl.load(book.authorId)
  }
}
