import { BookData } from "../data"
import { InputType, Field, Int } from 'type-graphql'
 
@InputType()
export class CreateBook implements BookData {
    @Field(type => Int)
    bookId: number;

    @Field()
    name: string;

    @Field(type => Int)
    pageCount: number;

    @Field(type => Int)
    authorId: number;    
}