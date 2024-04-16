import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PageComponent } from '../shared/components/page/page.component';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-configurator',
  standalone: true,
  imports: [PageComponent, CardComponent, RouterOutlet, RouterLink],
  templateUrl: './configurator.component.html',
  styleUrl: './configurator.component.scss',
})
export class ConfiguratorComponent {}
