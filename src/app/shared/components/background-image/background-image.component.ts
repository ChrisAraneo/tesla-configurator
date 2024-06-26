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
  @Input({ required: true }) alt: string = '';

  @ViewChild('image') imageRef?: ElementRef;

  protected isLoading: boolean = true;

  ngAfterViewInit(): void {
    const nativeImageElement: HTMLImageElement | undefined = this.imageRef?.nativeElement;

    if (nativeImageElement) {
      nativeImageElement.addEventListener('load', () => {
        this.isLoading = false;
      });
      nativeImageElement.addEventListener('error', (error: ErrorEvent) => {
        console.error(error);
        throw Error('Error while loading background image');
      });
    }
  }
}
