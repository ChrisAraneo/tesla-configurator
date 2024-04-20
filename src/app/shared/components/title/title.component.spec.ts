import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TitleComponent } from './title.component';

@Component({
  standalone: true,
  imports: [TitleComponent],
  template: `<app-title>Example</app-title>`,
})
class TestHostComponent {}

describe('TitleComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TitleComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  }));

  it('should create host component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should project content into the component', () => {
    expect(fixture.debugElement.nativeElement.querySelector('h1')?.textContent).toBe('Example');
  });
});
