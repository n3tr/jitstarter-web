import { ApolloClient, createNetworkInterface, applyMiddleware, applyAfterware } from 'react-apollo';
import Session from './Session'

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
      req.options.headers['authorization'] = Session.token
      next();
    }
  }])

  networkInterface.useAfter([{
    applyAfterware({ response }, next) {
      if (response.status === 401) {
        Session.logout()
        window.location.href = '/login'
      }
      next();
    }
  }])
  
  const client = new ApolloClient({
    networkInterface: networkInterface
  });
  return client
}