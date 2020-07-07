import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

interface ApolloProps {}

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const Apollo: React.FC<ApolloProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
