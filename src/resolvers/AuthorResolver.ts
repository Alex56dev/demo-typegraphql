import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { books, AuthorData, authors } from "../data";
import { CreateAuthor } from "../inputs/CreateAuthor"
import Author from "../schemas/Author";

@Resolver(of => Author)
export default class {
  @Query(returns => [Author])
  fetchAuthors(): AuthorData[] {
    return authors;
  }

  @Mutation(returns => Author)
  createAuthor(@Arg("data") createAuthorData: CreateAuthor): AuthorData 
  {
      var findAuthors = authors.filter(author => {
        return author.authorId === createAuthorData.authorId || 
          author.name === createAuthorData.name;
      })

      if (findAuthors.length > 0) {
        throw new Error("Автор с такими данными уже существует");
      }

      authors.push(createAuthorData)

      return createAuthorData;
  }
}
