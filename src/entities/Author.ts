import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany} from "typeorm";
import {Book} from "./Book"
import { Field, Int, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Author {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @OneToMany(type => Book, book => book.author)
    @Field(type => [Book])
    books: Book[];
}