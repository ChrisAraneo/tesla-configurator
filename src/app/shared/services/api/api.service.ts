import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { ApiEndpoints } from './types/api-endpoints.type';
import { ApiResponse } from './types/api-response.type';
import { ModelsApiData } from './types/models-api-data.type';
import { ModelsApiResponse } from './types/models-api-response.type';
import { OptionsApiData } from './types/options-api-data.type';
import { ProcessedOptionsApiData } from './types/processed-options-api-data.type';
import { Status } from './types/status.type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly retryCount = 10;
  private readonly retryDelay = 250;

  private readonly fixedTowPrice = 1000;
  private readonly fixedYokePrice = 1000;

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

  getOptions(modelCode: string): Observable<ApiResponse<ProcessedOptionsApiData>> {
    return this.httpClient
      .get<OptionsApiData>(this.api.optionsEndpoint.replace(':id', modelCode))
      .pipe(
        retry({ count: this.retryCount, delay: this.retryDelay }),
        map((response: OptionsApiData) => {
          return {
            status: Status.Success,
            data: {
              ...response,
              towHitch: {
                enabled: response.towHitch,
                price: this.fixedTowPrice,
              },
              yoke: {
                enabled: response.towHitch,
                price: this.fixedYokePrice,
              },
            },
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
