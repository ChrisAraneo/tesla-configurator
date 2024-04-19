import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { ApiEndpoints } from './types/api-endpoints.type';
import { ModelsApiData } from './types/models-api-data.type';
import { ModelsApiResponse } from './types/models-api-response.type';
import { OptionsApiData } from './types/options-api-data.type';
import { OptionsApiResponse } from './types/options-api-response.type';
import { Status } from './types/status.type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly retryCount = 10;
  private readonly retryDelay = 250;

  constructor(
    @Inject('API') private api: ApiEndpoints,
    private httpClient: HttpClient,
  ) {}

  getModels(): Observable<ModelsApiResponse> {
    return this.httpClient.get<ModelsApiData>(this.api.modelsEndpoint).pipe(
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
    return this.httpClient
      .get<OptionsApiData>(this.api.optionsEndpoint.replace(':id', modelCode))
      .pipe(
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
