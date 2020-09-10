import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { books, AuthorData, authors } from "../data";
import Author from "../schemas/Author";

@Resolver(of => Author)
export default class {
  @Query(returns => [Author])
  fetchAuthors(): AuthorData[] {
    return authors;
  }
}
