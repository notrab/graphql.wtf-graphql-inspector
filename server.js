const { GraphQLServer } = require("graphql-yoga");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const faker = require("faker");

const typeDefs = loadSchemaSync("schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const products = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
}));

const resolvers = {
  Query: {
    product: (_, { id }) => products.find((product) => product.id === id),
    products: () => products,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  enableLogging: false,
});

server.start(() => console.log("Server is running on localhost:4000"));
