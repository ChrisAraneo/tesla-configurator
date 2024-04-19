import { Environment } from './environment.type';

export const environment: Environment = {
  production: false,
  api: {
    modelsEndpoint: '/models',
    optionsEndpoint: '/options/:id',
  },
};
