import { Environment } from './environment.type';

// In "real" app this could be defined differently
export const environment: Environment = {
  production: true,
  api: {
    modelsEndpoint: '/models',
    optionsEndpoint: '/options/:id',
  },
};
