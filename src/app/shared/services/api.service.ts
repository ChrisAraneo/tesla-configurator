import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { ModelsApiData } from './types/models-api-data.type';
import { ModelsApiResponse } from './types/models-api-response.type';
import { OptionsApiData } from './types/options-api-data.type';
import { OptionsApiResponse } from './types/options-api-response.type';
import { Status } from './types/status.type';

const MODELS_ENDPOINT: string = '/models'; // TODO Move to env/providers
const OPTIONS_ENDPOINT: string = '/options'; // TODO Move to env/providers

// TODO Map to success or error
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly retryCount = 10;
  private readonly retryDelay = 250;

  constructor(private httpClient: HttpClient) {}

  getModels(): Observable<ModelsApiResponse> {
    return this.httpClient.get<ModelsApiData>(MODELS_ENDPOINT).pipe(
      retry({ count: this.retryCount, delay: this.retryDelay }),
      map((response: ModelsApiData) => {
        return {
          status: Status.Success,
          data: response,
        };
      }),
      catchError(() => {
        return of({
          status: Status.Error,
          data: null,
          message: 'Error while fetching models.',
        });
      }),
    );
  }

  getOptions(modelCode: string): Observable<OptionsApiResponse> {
    return this.httpClient.get<OptionsApiData>(`${OPTIONS_ENDPOINT}/${modelCode}`).pipe(
      retry({ count: this.retryCount, delay: this.retryDelay }),
      map((response: OptionsApiData) => {
        return {
          status: Status.Success,
          data: response,
        };
      }),
      catchError(() => {
        return of({
          status: Status.Error,
          data: null,
          message: 'Error while fetching options.',
        });
      }),
    );
  }
}
