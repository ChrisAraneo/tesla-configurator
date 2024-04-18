import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguratorService } from '../configurator.service';
import { ModelStepComponent } from './model-step.component';

describe('ModelStepComponent', () => {
  let component: ModelStepComponent;
  let fixture: ComponentFixture<ModelStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelStepComponent],
      providers: [
        {
          provide: ConfiguratorService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModelStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
