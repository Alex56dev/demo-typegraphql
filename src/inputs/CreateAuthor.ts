import {InputType, Field, Int} from 'type-graphql'

@InputType()
export class CreateAuthor {

    @Field(type => Int)
    authorId: number

    @Field()
    name: string

}