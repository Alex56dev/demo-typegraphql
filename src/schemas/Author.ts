import { Field, Int, ObjectType } from "type-graphql";
import Project from "./Book";

@ObjectType()
export default class Author {
  @Field(type => Int)
  authorId: number;

  @Field()
  name: string;
}
