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

  // @Mutation(returns => Author)
  // createAuthor(@Arg("data") createAuthorData: CreateAuthor): AuthorData 
  // {
  //     var findAuthors = authors.filter(author => {
  //       return author.authorId === createAuthorData.authorId || 
  //         author.name === createAuthorData.name;
  //     })

  //     if (findAuthors.length > 0) {
  //       throw new Error("Автор с такими данными уже существует");
  //     }

  //     authors.push(createAuthorData)

  //     return createAuthorData;
  // }
}
