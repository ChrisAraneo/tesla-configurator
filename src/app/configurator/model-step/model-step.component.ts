import { AsyncPipe, JsonPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ImageComponent } from '../../shared/components/image/image.component';
import { Color } from '../../shared/services/color.type';
import { Model } from '../../shared/services/model.type';
import { ConfiguratorService, Image } from '../configurator.service';

@Component({
  selector: 'app-model-step',
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe, NgFor, ReactiveFormsModule, ImageComponent, NgStyle],
  templateUrl: './model-step.component.html',
  styleUrl: './model-step.component.scss',
})
export class ModelStepComponent implements OnInit {
  loading!: Observable<boolean>;
  models!: Observable<Model[]>;
  colors!: Observable<Color[]>;
  image!: Observable<Image | null>;

  constructor(readonly service: ConfiguratorService) {
    // TODO Resolver
  }

  ngOnInit(): void {
    this.loading = this.service.loading;
    this.models = this.service.models;
    this.colors = this.service.colors;
    this.image = this.service.image;
  }
}
