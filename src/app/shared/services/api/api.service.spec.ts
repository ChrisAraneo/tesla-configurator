import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

// TODO Finish unit tests
describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: 'API',
          useValue: {
            modelsEndpoint: '/models',
            optionsEndpoint: '/options/:id',
          },
        },
        {
          provide: HttpClient,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
