import { Color } from './color.type';

export type ModelsApiResponse = Array<{
  code: string;
  description: string;
  colors: Color[];
}>;
