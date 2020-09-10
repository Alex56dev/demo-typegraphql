import { InputType, Field, Int } from 'type-graphql'
 
@InputType()
export class CreateBook {
    @Field(type => Int)
    bookId: number;

    @Field()
    name: string;

    @Field(type => Int)
    pageCount: number;

    @Field(type => Int)
    authorId: number;    
}