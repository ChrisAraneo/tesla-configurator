import { Config } from './config.type';

export type ProcessedOptionsApiData = {
  configs: Config[];
  towHitch: {
    enabled: boolean;
    price: number;
  };
  yoke: {
    enabled: boolean;
    price: number;
  };
};
