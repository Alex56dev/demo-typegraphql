import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import BookResolver from "./resolvers/BookResolver";
import AuthorResolver from "./resolvers/AuthorResolver";
import { createConnection } from "typeorm"
import { seedDatabase } from "./data"

async function bootstrap() {
  const connection = await createConnection();

  seedDatabase();

  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver],
    emitSchemaFile: true,
  });

  const server = new GraphQLServer({
    schema,
  });

  server.start(() => console.log("Server is running on http://localhost:4000"));
}

bootstrap();
