import { Config } from './config.type';

export type OptionsApiResponse = Array<{
  [key: string]: {
    configs: Config[];
    towHitch: boolean;
    yoke: boolean;
  };
}>;
