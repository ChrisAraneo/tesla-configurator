import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardComponent } from './card.component';

@Component({
  standalone: true,
  imports: [CardComponent],
  template: `<app-card>Text inside card</app-card>`,
})
class TestHostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CardComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  }));

  it('should create host component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should project content into the component', () => {
    expect(fixture.debugElement.nativeElement.querySelector('div')?.textContent).toBe(
      'Text inside card',
    );
  });
});
