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
import { ExtraOption } from '../shared/types/extra-option.type';
import { Image } from '../shared/types/image.type';

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
  selectedTowHitch!: Observable<boolean>;
  yoke!: Observable<ExtraOption | null>;
  selectedYoke!: Observable<boolean>;
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
    this.selectedTowHitch = this.service.selectedTowHitch;
    this.yoke = this.service.yoke;
    this.selectedYoke = this.service.selectedYoke;
    this.image = this.service.image;

    this.initializeTotalObservable();
  }

  reload: () => void = () => {
    this.service.reload();
  };

  private initializeTotalObservable(): void {
    this.total = combineLatest([
      this.config,
      this.color,
      this.towHitch,
      this.selectedTowHitch,
      this.yoke,
      this.selectedYoke,
    ]).pipe(
      map(([config, color, towHitch, selectedTowHitch, yoke, selectedYoke]) => {
        return (
          config.price +
          color.price +
          (towHitch?.enabled && selectedTowHitch ? towHitch.price : 0) +
          (yoke?.enabled && selectedYoke ? yoke.price : 0)
        );
      }),
    );
  }
}
