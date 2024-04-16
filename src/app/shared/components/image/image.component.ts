import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements AfterViewInit {
  @Input({ required: true }) src: string = '';
  @Input({ required: true }) width: number = 0;
  @Input({ required: true }) height: number = 0;
  @Input({ required: true }) alt: string = '';

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
