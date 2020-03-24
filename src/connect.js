import Client from '@signalk/client';

// Instantiate client with authentication
export const client = new Client({
  hostname: '0.0.0.0',
  port: 3443,
  useTLS: true,
  useAuthentication: true,
  reconnect: true,
  autoConnect: false,
  username: 'benobee',
  password: 'Tremont32!',
});

// Subscribe to specific paths over WS
const subscription = {
  context: '*',
  subscribe: [{
    path: 'environment.wind.*',
  }],
};

client
  .connect()
  .then(() => client.subscribe(subscription))
  .catch((err) => {
    throw (err);
  });
