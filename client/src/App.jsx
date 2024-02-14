import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Auth from './utils/auth';

// Create an HTTP link that connects to the GraphQL endpoint
const httpLink = createHttpLink({
  // Use VITE_ prefix for Vite projects to access environment variables
  uri:import.meta.env.VITE_MONGODB_URI,
});

// Create a context link that adds the token to the headers of each request
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = Auth.getToken();
  // Return the headers to the context so the httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Initialize Apollo Client with the authLink and httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the authLink with the httpLink
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