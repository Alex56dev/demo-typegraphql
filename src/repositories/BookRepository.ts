import {EntityRepository, In, Repository} from "typeorm"
import { Book } from "../entities/Book"

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
    findByAuthorIds(ids: number[]) {
        return this.find({authorId: In(ids)})
    }

    findBooksByAuthorName(authorName: string) {
        return this.createQueryBuilder("book")
            .leftJoinAndSelect("book.author", "author")
            .where("author.name ilike :name", { name: `%${authorName}%` })
            .getMany()
    }
}