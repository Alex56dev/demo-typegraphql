import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import BookResolver from "./resolvers/BookResolver";
import AuthorResolver from "./resolvers/AuthorResolver";

async function bootstrap() {
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
