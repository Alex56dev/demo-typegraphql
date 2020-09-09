import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { books, authors, BookData } from "../data";
import Book from "../schemas/Book";

@Resolver(of => Book)
export default class BookResolver {
  // @Query(returns => Project, { nullable: true })
  // projectByName(@Arg("name") name: string): ProjectData | undefined {
  //   return projects.find(project => project.name === name);
  // }

  @Query(returns => [Book])
  fetchBooks(): BookData[] {
    return books;
  }

  @FieldResolver()
  author(@Root() bookData: BookData) {
    return authors.filter(author => {
      return author.authorId === bookData.authorId;
    })[0];
  }
}
