import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageComponent } from '../shared/components/page/page.component';
import { TitleComponent } from '../shared/components/title/title.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageComponent, TitleComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
