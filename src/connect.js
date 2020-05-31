import Client from '@signalk/client';
import { USER_NAME, PASSWORD } from '../config';

// Instantiate client with authentication
export const client = new Client({
  hostname: '0.0.0.0',
  port: 3000,
  useTLS: true,
  useAuthentication: true,
  reconnect: true,
  autoConnect: false,
  username: USER_NAME,
  password: PASSWORD,
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
