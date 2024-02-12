import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

// Initialize Apollo Client
const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;

