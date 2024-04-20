import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguratorService } from '../configurator.service';
import { ConfigStepComponent } from './config-step.component';

describe('ConfigStepComponent', () => {
  let component: ConfigStepComponent;
  let fixture: ComponentFixture<ConfigStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigStepComponent],
      providers: [
        {
          provide: ConfiguratorService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
