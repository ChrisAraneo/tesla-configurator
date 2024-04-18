import { Color } from './color.type';

export type ModelsApiData = Array<{
  code: string;
  description: string;
  colors: Color[];
}>;
