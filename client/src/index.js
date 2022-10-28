import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createUploadLink} from 'apollo-upload-client';
import {ApolloClient} from '@apollo/client';
import {ApolloProvider} from '@apollo/react-hooks';
import {InMemoryCache} from 'apollo-cache-inmemory';
const root = ReactDOM.createRoot(document.getElementById('root'));
const link=createUploadLink({uri:"http://localhost:4000/graphql"});
const client=new ApolloClient({
  link,
  cache:new InMemoryCache()
})
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
