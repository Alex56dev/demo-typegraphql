import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, RelationId} from "typeorm";
import {Author} from './Author'
import { Field, Int, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Book {
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
    @Field()
    author: Author;

    @Field(type => Int)
    @Column({ nullable: true })
    authorId: number;
}