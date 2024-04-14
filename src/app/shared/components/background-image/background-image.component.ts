import { NgOptimizedImage, NgStyle } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-background-image',
  standalone: true,
  imports: [NgOptimizedImage, NgStyle],
  templateUrl: './background-image.component.html',
  styleUrl: './background-image.component.scss',
})
export class BackgroundImageComponent implements AfterViewInit {
  @Input({ required: true }) src: string = '';

  @ViewChild('image') imageRef?: ElementRef;

  protected isLoading: boolean = true;

  ngAfterViewInit(): void {
    const nativeImageElement: HTMLImageElement | undefined = this.imageRef?.nativeElement;

    if (nativeImageElement) {
      // TODO Destroy??
      nativeImageElement.addEventListener('load', () => {
        this.isLoading = false;
      });
      nativeImageElement.addEventListener('error', () => {
        // TODO Handle error
      });
    }
  }
}
