import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackgroundImageComponent } from '../shared/components/background-image/background-image.component';
import { TitleComponent } from '../shared/components/title/title.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BackgroundImageComponent, TitleComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
