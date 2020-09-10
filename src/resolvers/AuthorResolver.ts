import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { CreateAuthor } from "../inputs/CreateAuthor"
import { Author } from "../entities/Author";

@Resolver(of => Author)
export default class {
  @Query(returns => [Author])
  async fetchAuthors(): Promise<Author[]> {
    return (await Author.getRepository()
      .find({relations: ['books']})
    );
  }

  @Mutation(returns => Author)
  async createAuthor(@Arg("data") createAuthorData: CreateAuthor): Promise<Author>
  {
      var author = new Author();
      author.name = createAuthorData.name;
      await author.save();

      return author;
  }
}
