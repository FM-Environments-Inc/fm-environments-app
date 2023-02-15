import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { API_URL } from '../config';

const httpLink = new HttpLink({ uri: `${API_URL }/graphql` });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
export default client;
