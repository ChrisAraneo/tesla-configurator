import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ParagraphComponent } from './paragraph.component';

@Component({
  standalone: true,
  imports: [ParagraphComponent],
  template: `<app-paragraph>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </app-paragraph>`,
})
class TestHostComponent {}

describe('ParagraphComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ParagraphComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  }));

  it('should create host component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should project content into the component', () => {
    expect(fixture.debugElement.nativeElement.querySelector('p')?.textContent).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    );
  });
});
