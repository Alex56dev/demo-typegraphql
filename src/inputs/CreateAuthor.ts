import {AuthorData} from '../data'
import {InputType, Field, Int} from 'type-graphql'

@InputType()
export class CreateAuthor implements AuthorData {

    @Field(type => Int)
    authorId: number

    @Field()
    name: string

}