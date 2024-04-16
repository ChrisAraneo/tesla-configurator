import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Model } from './model.type';

const MODELS_ENDPOINT: string = '/models'; // TODO Move to env/providers

// TODO Map to success or error
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getModels(): Observable<Model[]> {
    return this.httpClient.get<Model[]>(MODELS_ENDPOINT).pipe(retry({ count: 10, delay: 250 }));
  }
}
