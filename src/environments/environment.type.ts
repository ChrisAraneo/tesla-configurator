export type Environment = {
  production: boolean;
  api: {
    modelsEndpoint: string;
    optionsEndpoint: string;
  };
};
