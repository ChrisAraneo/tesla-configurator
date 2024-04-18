import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageComponent } from '../shared/components/page/page.component';
import { TitleComponent } from '../shared/components/title/title.component';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [PageComponent, TitleComponent, RouterLink],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss',
})
export class ForbiddenComponent {}
