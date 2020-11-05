import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  Ctx,
  Info
} from "type-graphql";
import { CreateAuthor } from "../inputs/CreateAuthor"
import { Author } from "../entities/Author";
import { Book } from "../entities/Book";
import { Context } from "graphql-yoga/dist/types";
import { GraphQLResolveInfo } from 'graphql'
import DataLoader from "dataloader";
import { getConnection, In, Repository } from 'typeorm'

@Resolver(of => Author)
export default class {
  private authorRepository: Repository<Author>;

  private bookRepository: Repository<Book>;

  constructor() {
    this.authorRepository = getConnection().getRepository(Author)
    this.bookRepository = getConnection().getRepository(Book)
  }

  @Query(returns => [Author])
  async fetchAuthors(): Promise<Author[]> {
    return (await this.authorRepository.find());
  }

  @Mutation(returns => Author)
  async createAuthor(@Arg("data") createAuthorData: CreateAuthor): Promise<Author>
  {
      var author = new Author();
      author.name = createAuthorData.name;
      await this.authorRepository.save(author);

      return author;
  }

  @FieldResolver()
  async books(@Root() author: Author, @Ctx() ctx: Context, @Info() info: GraphQLResolveInfo): Promise<[Book]> {
    const { dataloaders } = ctx;

    let dl = dataloaders.get(info.fieldNodes);
    if (!dl) {
      dl = new DataLoader(async (ids: any) => {
        const books = (await this.bookRepository.find({authorId: In(ids)}))
        const sortedBooks = ids.map((id: number) => books.filter((x: Book) => x.authorId === id))

        return [];
      })
      dataloaders.set(info.fieldNodes, dl)
    }
    return dl.load(author.id)
  }
}
