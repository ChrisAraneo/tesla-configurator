import { Component, Input } from '@angular/core';
import { BackgroundImageComponent } from '../background-image/background-image.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [BackgroundImageComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  @Input({ required: true }) backgroundImageSrc: string = '';
}
