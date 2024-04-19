import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ErrorToastComponent } from '../../shared/components/error-toast/error-toast.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { Color } from '../../shared/services/api/types/color.type';
import { Config } from '../../shared/services/api/types/config.type';
import { Model } from '../../shared/services/api/types/model.type';
import { Error } from '../../shared/services/global-error-handler/error.type';
import { ConfiguratorService } from '../configurator.service';
import { ExtraOption } from '../shared/extra-option.type';
import { Image } from '../shared/image.type';

@Component({
  selector: 'app-summary-step',
  standalone: true,
  imports: [TitleComponent, AsyncPipe, NgIf, ImageComponent, ErrorToastComponent, CurrencyPipe],
  templateUrl: './summary-step.component.html',
  styleUrl: './summary-step.component.scss',
})
export class SummaryStepComponent implements OnInit {
  loading!: Observable<boolean>;
  error!: Observable<Error>;

  model!: Observable<Model>;
  config!: Observable<Config>;
  color!: Observable<Color>;
  towHitch!: Observable<ExtraOption | null>;
  yoke!: Observable<ExtraOption | null>;
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

    this.initializeTotalObservable();
  }

  reload: () => void = () => {
    this.service.reload();
  };

  private initializeTotalObservable(): void {
    this.total = combineLatest([this.config, this.color, this.towHitch, this.yoke]).pipe(
      map(([config, color, towHitch, yoke]) => {
        return (
          config.price +
          color.price +
          (towHitch?.enabled ? towHitch.price : 0) +
          (yoke?.enabled ? yoke.price : 0)
        );
      }),
    );
  }
}
