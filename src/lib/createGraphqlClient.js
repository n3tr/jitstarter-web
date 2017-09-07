import { ApolloClient, createNetworkInterface, applyMiddleware } from 'react-apollo';


export default () => {
  const networkInterface = createNetworkInterface({
    uri: 'https://jitstarter-server.herokuapp.com/graphql',
    opts: {
      // Additional fetch options like `credentials` or `headers`
      credentials: 'same-origin',
    }
  })

  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }
      req.options.headers['authorization'] = localStorage.getItem('token') ? localStorage.getItem('token') : null;
      next();
    }
  }]);
  
  const client = new ApolloClient({
    networkInterface: networkInterface
  });
  return client
}