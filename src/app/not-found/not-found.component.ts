import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageComponent } from '../shared/components/page/page.component';
import { TitleComponent } from '../shared/components/title/title.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [PageComponent, TitleComponent, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
