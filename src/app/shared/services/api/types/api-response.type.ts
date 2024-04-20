import { Status } from './status.type';

export type ApiResponse<T> = {
  status: Status;
  data: T | null;
  message?: string;
};
