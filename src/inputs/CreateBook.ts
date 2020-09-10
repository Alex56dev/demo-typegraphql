import { InputType, Field, Int } from 'type-graphql'
 
@InputType()
export class CreateBook {
    @Field()
    name: string;

    @Field(type => Int)
    pageCount: number;

    @Field(type => Int)
    authorId: number;    
}