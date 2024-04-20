import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguratorService } from '../configurator.service';
import { SummaryStepComponent } from './summary-step.component';

describe('SummaryStepComponent', () => {
  let component: SummaryStepComponent;
  let fixture: ComponentFixture<SummaryStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryStepComponent],
      providers: [
        {
          provide: ConfiguratorService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
