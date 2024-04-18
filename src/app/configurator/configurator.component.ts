import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CardComponent } from '../shared/components/card/card.component';
import { PageComponent } from '../shared/components/page/page.component';
import { ConfiguratorService } from './configurator.service';
import { DisabledSteps } from './shared/disabled-steps.type';

@Component({
  selector: 'app-configurator',
  standalone: true,
  imports: [
    PageComponent,
    CardComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './configurator.component.html',
  styleUrl: './configurator.component.scss',
})
export class ConfiguratorComponent implements OnInit {
  disabledSteps!: Observable<DisabledSteps>;

  constructor(private readonly service: ConfiguratorService) {}

  ngOnInit(): void {
    this.disabledSteps = this.service.disabledSteps;
  }
}
