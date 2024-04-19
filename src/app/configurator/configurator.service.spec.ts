import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ApiService } from '../shared/services/api/api.service';
import { ModelsApiResponse } from '../shared/services/api/types/models-api-response.type';
import { Status } from '../shared/services/api/types/status.type';
import { ConfiguratorService } from './configurator.service';

describe('ConfiguratorService', () => {
  let service: ConfiguratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: {
            getModels: (): Observable<ModelsApiResponse> =>
              of({
                status: Status.Success,
                data: [],
              }),
          },
        },
      ],
    });
    service = TestBed.inject(ConfiguratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
