const Fastify = require('fastify');
const GQL = require('fastify-gql');
const schemaResolvers = require('./schemaResolvers.js');

const app = Fastify();

app.register(GQL, {
  schema: schemaResolvers.schema,
  // rootValue: schemaResolvers.root,
  resolvers: schemaResolvers.root,
  graphiql: true,
});

// app.get('/', async (req, reply) => {
//   // const query = req.body;
//   return reply.graphql(req.query);
// });

app.listen(3000);
console.log(`GraphQL API server running at localhost: ${3000}`);
