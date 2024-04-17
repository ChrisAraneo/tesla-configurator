import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { Color } from '../shared/services/color.type';
import { Model } from '../shared/services/model.type';
import { ModelsApiResponse } from '../shared/services/models-api-response.type';

type ConfiguratorForm = {
  // TODO Move to separate file
  model: FormControl<string | null>;
  color: FormControl<string | null>;
};

// TODO Move to separate file
export type Image = {
  src: string;
  alt: string;
};

export type DisabledSteps = {
  1: boolean;
  2: boolean;
  3: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService implements OnDestroy {
  private _form!: FormGroup<ConfiguratorForm>;
  private _data = new BehaviorSubject<ModelsApiResponse>([]);
  private _models = new BehaviorSubject<Model[]>([]);
  private _colors = new BehaviorSubject<Color[]>([]);
  private _image = new BehaviorSubject<Image | null>(null);
  private _disabledSteps = new BehaviorSubject<DisabledSteps>({ 1: true, 2: true, 3: true });
  private _loading = new BehaviorSubject<boolean>(true);
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    this.initializeForm();
    this.fetchData();
    this.subscribeToDataChanges();
    this.subscribeToModelControlValueChanges();
    this.subscribeToFormGroupValueChanges();
  }

  get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  get disabledStep(): Observable<DisabledSteps> {
    return this._disabledSteps.asObservable();
  }

  get models(): Observable<Model[]> {
    return this._models.asObservable();
  }

  get colors(): Observable<Color[]> {
    return this._colors.asObservable();
  }

  get image(): Observable<Image | null> {
    return this._image.asObservable();
  }

  get form(): FormGroup<ConfiguratorForm> {
    return this._form;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchData(): void {
    this.subscription.add(
      this.apiService.getModels().subscribe((response: ModelsApiResponse) => {
        this._data.next(response);
      }),
    );
  }

  private initializeForm(): void {
    this._form = this.formBuilder.group({
      model: new FormControl<string | null>(null),
      color: new FormControl<string | null>(null), // TODO Add validation, color must be correct for model!
    });
  }

  private subscribeToDataChanges(): void {
    this.subscription.add(
      this._data.asObservable().subscribe((data: ModelsApiResponse) => {
        if (this._loading.getValue()) {
          this._loading.next(false);
        }

        this._models.next(data.map((item) => ({ code: item.code, description: item.description })));
      }),
    );
  }

  private subscribeToModelControlValueChanges(): void {
    this.subscription.add(
      this.form.controls['model'].valueChanges.subscribe((value: string | null) => {
        this.form.controls['color'].patchValue(null);
        this._colors.next(this._data.getValue().find((item) => item.code === value)?.colors || []);
      }),
    );
  }

  private subscribeToFormGroupValueChanges(): void {
    this.subscription.add(
      this.form.valueChanges.subscribe((value) => {
        const model: string = value?.model || '';
        const color: string = value?.color || '';
        const disabledSteps: DisabledSteps = { 1: false, 2: true, 3: true };

        if (model && color) {
          this._image.next({
            src: `assets/${model.toLocaleLowerCase()}-${color.toLocaleLowerCase()}.jpg`,
            alt: `Tesla car model ${model} in color ${color}`,
          });

          disabledSteps[2] = false;
        } else {
          this._image.next(null);
        }

        this._disabledSteps.next(disabledSteps);
      }),
    );
  }
}
