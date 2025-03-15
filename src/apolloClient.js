import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }), // Замените на ваш GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
