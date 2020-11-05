import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import BookResolver from "./resolvers/BookResolver";
import AuthorResolver from "./resolvers/AuthorResolver";
import { createConnection } from "typeorm"
import { seedDatabase, clearDatabase } from "./data"
import { ContextParameters } from "graphql-yoga/dist/types";

async function bootstrap() {
  const connection = await createConnection();  
  await clearDatabase();
  await seedDatabase();

  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver],
    emitSchemaFile: true    
  });

  const server = new GraphQLServer({
    schema,
    context: (req: ContextParameters) => ({
      req,
      dataloaders: new WeakMap(),
    })
  });

  server.start(() => console.log("Server is running on http://localhost:4000"));
}

bootstrap();
