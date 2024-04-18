import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ForbiddenComponent } from './forbidden.component';

describe('ForbiddenComponent', () => {
  let component: ForbiddenComponent;
  let fixture: ComponentFixture<ForbiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForbiddenComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    expect(fixture.debugElement.nativeElement.querySelector('h1')?.textContent).toContain(
      'Cannot access',
    );
  });

  it('should render paragraph', () => {
    expect(fixture.debugElement.nativeElement.querySelector('p')?.textContent).toContain(
      'You cannot access this page because your session expired or required data in the form is missing.',
    );
  });

  it('should render first link with correct text', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('a')[0]?.textContent).toContain(
      'Go to Tesla configurator',
    );
  });

  it('should render second link with correct text', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('a')[1]?.textContent).toContain(
      'Homepage',
    );
  });
});
