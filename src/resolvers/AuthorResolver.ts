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
import { In } from 'typeorm'

@Resolver(of => Author)
export default class {
  @Query(returns => [Author])
  async fetchAuthors(): Promise<Author[]> {
    return (await Author.find());
  }

  @Mutation(returns => Author)
  async createAuthor(@Arg("data") createAuthorData: CreateAuthor): Promise<Author>
  {
      var author = new Author();
      author.name = createAuthorData.name;
      await author.save();

      return author;
  }

  @FieldResolver()
  async books(@Root() author: Author, @Ctx() ctx: Context, @Info() info: GraphQLResolveInfo): Promise<[Book]> {
    const { dataloaders } = ctx;

    let dl = dataloaders.get(info.fieldNodes);
    if (!dl) {
      dl = new DataLoader(async (ids: any) => {
        const books = (await Book.find({authorId: In(ids)}))
        const sortedBooks = ids.map((id: number) => books.filter((x: Book) => x.authorId === id))

        return sortedBooks;
      })
      dataloaders.set(info.fieldNodes, dl)
    }
    return dl.load(author.id)
  }
}
