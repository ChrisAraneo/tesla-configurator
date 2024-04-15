import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigStepComponent } from './config-step.component';

describe('ConfigStepComponent', () => {
  let component: ConfigStepComponent;
  let fixture: ComponentFixture<ConfigStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
