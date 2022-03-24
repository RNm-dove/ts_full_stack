import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { SetForm, SetList } from '@server/feature-sets';

const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache()
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Welcome to client!</title>
      </Head>
      <main className="app">
        {/* <Component {...pageProps} /> */}
      <h1>My Lego Sets</h1>
      <div className="flex">
        <SetForm />
        <SetList />
      </div>
      </main>
    </ ApolloProvider>
  );
}

export default CustomApp;
