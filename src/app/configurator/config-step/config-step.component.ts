import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ErrorToastComponent } from '../../shared/components/error-toast/error-toast.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { Error } from '../../shared/services/global-error-handler/error.type';
import { ConfiguratorService } from '../configurator.service';
import { ExtraOption } from '../shared/types/extra-option.type';
import { Image } from '../shared/types/image.type';
import { Options } from '../shared/types/options.type';

@Component({
  selector: 'app-config-step',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    ImageComponent,
    NgFor,
    ErrorToastComponent,
    TitleComponent,
    CurrencyPipe,
  ],
  templateUrl: './config-step.component.html',
  styleUrl: './config-step.component.scss',
})
export class ConfigStepComponent implements OnInit {
  loading!: Observable<boolean>;
  error!: Observable<Error>;

  options!: Observable<Options | null>;
  range!: Observable<number | null>;
  maxSpeed!: Observable<number | null>;
  price!: Observable<number | null>;
  towHitch!: Observable<ExtraOption | null>;
  yoke!: Observable<ExtraOption | null>;
  image!: Observable<Image | null>;

  constructor(readonly service: ConfiguratorService) {}

  ngOnInit(): void {
    this.loading = this.service.loading;
    this.error = this.service.error;
    this.options = this.service.options;
    this.range = this.service.range;
    this.maxSpeed = this.service.maxSpeed;
    this.price = this.service.price;
    this.towHitch = this.service.towHitch;
    this.yoke = this.service.yoke;
    this.image = this.service.image;
  }

  reload: () => void = () => {
    this.service.reload();
  };
}
