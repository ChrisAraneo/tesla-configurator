import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { ModelsApiResponse } from './models-api-response.type';
import { OptionsApiResponse } from './options-api-response.type';

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
    return this.httpClient
      .get<ModelsApiResponse>(MODELS_ENDPOINT)
      .pipe(retry({ count: this.retryCount, delay: this.retryDelay }));
  }

  getOptions(modelCode: string): Observable<OptionsApiResponse> {
    return this.httpClient
      .get<OptionsApiResponse>(`${OPTIONS_ENDPOINT}/${modelCode}`)
      .pipe(retry({ count: this.retryCount, delay: this.retryDelay }));
  }
}
