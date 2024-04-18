import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { TitleComponent } from '../../shared/components/title/title.component';
import { Color } from '../../shared/services/types/color.type';
import { Config } from '../../shared/services/types/config.type';
import { Model } from '../../shared/services/types/model.type';
import { ConfiguratorService } from '../configurator.service';

@Component({
  selector: 'app-summary-step',
  standalone: true,
  imports: [TitleComponent, AsyncPipe, NgIf],
  templateUrl: './summary-step.component.html',
  styleUrl: './summary-step.component.scss',
})
export class SummaryStepComponent implements OnInit {
  loading!: Observable<boolean>;
  model!: Observable<Model>;
  config!: Observable<Config>;
  color!: Observable<Color>;
  towHitch!: Observable<boolean>;
  yoke!: Observable<boolean>;

  total!: Observable<number>;

  constructor(private readonly service: ConfiguratorService) {}

  ngOnInit(): void {
    this.loading = this.service.loading;
    this.model = this.service.selectedModel;
    this.config = this.service.selectedConfig;
    this.color = this.service.selectedColor;
    this.towHitch = this.service.towHitch;
    this.yoke = this.service.yoke;

    // TODO Move calculating total to service
    this.total = combineLatest([this.config, this.color, this.towHitch, this.yoke]).pipe(
      map(([config, color, towHitch, yoke]) => {
        // TODO Implement rule on additional 1000$s
        return config.price + color.price + (towHitch ? 1000 : 0) + (yoke ? 1000 : 0);
      }),
    );
  }
}
