import { Field, Int, ObjectType } from "type-graphql";
import Author from "./Author";

@ObjectType()
export default class Book {
  @Field(type => Int)
  bookId: number;

  @Field()
  name: string;

  @Field(type => Int)
  pageCount: number;

  @Field(type => Int)
  authorId: number;

  @Field(type => Author)
  author: Author;
}
