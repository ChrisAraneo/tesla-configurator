import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ErrorToastComponent } from '../../shared/components/error-toast/error-toast.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { Color } from '../../shared/services/types/color.type';
import { Config } from '../../shared/services/types/config.type';
import { Model } from '../../shared/services/types/model.type';
import { ConfiguratorService } from '../configurator.service';
import { Error } from '../shared/error.type';
import { Image } from '../shared/image.type';

@Component({
  selector: 'app-summary-step',
  standalone: true,
  imports: [TitleComponent, AsyncPipe, NgIf, ImageComponent, ErrorToastComponent],
  templateUrl: './summary-step.component.html',
  styleUrl: './summary-step.component.scss',
})
export class SummaryStepComponent implements OnInit {
  loading!: Observable<boolean>;
  error!: Observable<Error>;

  model!: Observable<Model>;
  config!: Observable<Config>;
  color!: Observable<Color>;
  towHitch!: Observable<boolean>;
  yoke!: Observable<boolean>;
  image!: Observable<Image | null>;

  total!: Observable<number>;

  constructor(private readonly service: ConfiguratorService) {}

  ngOnInit(): void {
    this.loading = this.service.loading;
    this.error = this.service.error;
    this.model = this.service.selectedModel;
    this.config = this.service.selectedConfig;
    this.color = this.service.selectedColor;
    this.towHitch = this.service.towHitch;
    this.yoke = this.service.yoke;
    this.image = this.service.image;

    // TODO Move calculating total to service
    this.total = combineLatest([this.config, this.color, this.towHitch, this.yoke]).pipe(
      map(([config, color, towHitch, yoke]) => {
        // TODO Implement rule on additional 1000$s
        return config.price + color.price + (towHitch ? 1000 : 0) + (yoke ? 1000 : 0);
      }),
    );
  }

  reload: () => void = () => {
    this.service.reload();
  };
}
