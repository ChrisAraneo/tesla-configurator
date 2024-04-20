import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ConfiguratorComponent } from './configurator.component';
import { ConfiguratorService } from './configurator.service';

describe('ConfiguratorComponent', () => {
  let component: ConfiguratorComponent;
  let fixture: ComponentFixture<ConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorComponent],
      providers: [
        {
          provide: ConfiguratorService,
          useValue: {},
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
