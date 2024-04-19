import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ErrorToastComponent } from '../../shared/components/error-toast/error-toast.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { Color } from '../../shared/services/api/types/color.type';
import { Model } from '../../shared/services/api/types/model.type';
import { Error } from '../../shared/services/global-error-handler/error.type';
import { ConfiguratorService } from '../configurator.service';
import { Image } from '../shared/image.type';

@Component({
  selector: 'app-model-step',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgFor,
    ReactiveFormsModule,
    ImageComponent,
    ErrorToastComponent,
    TitleComponent,
  ],
  templateUrl: './model-step.component.html',
  styleUrl: './model-step.component.scss',
})
export class ModelStepComponent implements OnInit {
  loading!: Observable<boolean>;
  error!: Observable<Error>;

  models!: Observable<Model[]>;
  colors!: Observable<Color[]>;
  image!: Observable<Image | null>;

  constructor(readonly service: ConfiguratorService) {}

  ngOnInit(): void {
    this.loading = this.service.loading;
    this.error = this.service.error;
    this.models = this.service.models;
    this.colors = this.service.colors;
    this.image = this.service.image;
  }

  reload: () => void = () => {
    this.service.reload();
  };
}
