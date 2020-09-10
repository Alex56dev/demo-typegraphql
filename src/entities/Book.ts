import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from "typeorm";
import {Author} from './Author'
import { Field, Int, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field(type => Int)
    pageCount: number;

    @ManyToOne(type => Author, author => author.books)
    author: Author;

    @Field(type => Int)
    authorId: number;
}