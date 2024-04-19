import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComponent } from './page.component';

@Component({
  standalone: true,
  imports: [PageComponent],
  template: `<app-page [backgroundImageSrc]="'assets/example.jpg'" [backgroundImageAlt]="'Example'">
    <div id="test">Div inside the page</div>
  </app-page>`,
})
class TestHostComponent {}

describe('PageComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create host component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should project content into the component', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#test')?.textContent).toBe(
      'Div inside the page',
    );
  });
});
