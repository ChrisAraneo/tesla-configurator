import { NgOptimizedImage, NgStyle } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgOptimizedImage, NgStyle],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements AfterViewInit {
  @Input({ required: true }) src: string = '';
  @Input({ required: true }) width: number = 0;
  @Input({ required: true }) height: number = 0;
  @Input() maxWidth?: number;
  @Input() maxHeight?: number;
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
        throw Error('Error while loading image');
      });
    }
  }
}
