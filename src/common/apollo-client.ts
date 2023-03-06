import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';

import { API_URL } from '../config';

// const link = new HttpLink({ uri: `${API_URL}/graphql` });
const link = createUploadLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  // link: httpLink,
  link,
  cache: new InMemoryCache()
});
export default client;
