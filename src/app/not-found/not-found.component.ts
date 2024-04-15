import { Component } from '@angular/core';
import { BackgroundImageComponent } from '../shared/components/background-image/background-image.component';
import { TitleComponent } from '../shared/components/title/title.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [BackgroundImageComponent, TitleComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
