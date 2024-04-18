import { AsyncPipe, JsonPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ImageComponent } from '../../shared/components/image/image.component';
import { ConfiguratorService, Image, Options } from '../configurator.service';

@Component({
  selector: 'app-config-step',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe, ImageComponent, NgFor, NgStyle, JsonPipe],
  templateUrl: './config-step.component.html',
  styleUrl: './config-step.component.scss',
})
export class ConfigStepComponent implements OnInit {
  loading!: Observable<boolean>;
  options!: Observable<Options | null>;
  range!: Observable<number | null>;
  maxSpeed!: Observable<number | null>;
  price!: Observable<number | null>;
  towHitch!: Observable<boolean>;
  yoke!: Observable<boolean>;
  image!: Observable<Image | null>;

  constructor(readonly service: ConfiguratorService) {}

  ngOnInit(): void {
    this.loading = this.service.loading;
    this.options = this.service.options;
    this.range = this.service.range;
    this.maxSpeed = this.service.maxSpeed;
    this.price = this.service.price;
    this.towHitch = this.service.towHitch;
    this.yoke = this.service.yoke;
    this.image = this.service.image;
  }
}
