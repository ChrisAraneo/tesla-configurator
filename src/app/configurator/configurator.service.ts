import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  filter,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { Color } from '../shared/services/types/color.type';
import { Config } from '../shared/services/types/config.type';
import { Model } from '../shared/services/types/model.type';
import { ModelsApiData } from '../shared/services/types/models-api-data.type';
import { ModelsApiResponse } from '../shared/services/types/models-api-response.type';
import { OptionsApiData } from '../shared/services/types/options-api-data.type';
import { OptionsApiResponse } from '../shared/services/types/options-api-response.type';
import { Status } from '../shared/services/types/status.type';
import { ConfiguratorForm } from './shared/configurator-form.type';
import { DisabledSteps } from './shared/disabled-steps.type';
import { Image } from './shared/image.type';
import { Options } from './shared/options.type';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService implements OnDestroy {
  private _form!: FormGroup<ConfiguratorForm>;

  private _loading = new BehaviorSubject<boolean>(true);
  private _disabledSteps = new BehaviorSubject<DisabledSteps>({ 1: true, 2: true, 3: true });

  private _modelsData = new BehaviorSubject<ModelsApiData>([]);
  private _optionsData = new BehaviorSubject<OptionsApiData | null>(null);

  private _models = new BehaviorSubject<Model[]>([]);
  private _colors = new BehaviorSubject<Color[]>([]);
  private _image = new BehaviorSubject<Image | null>(null);
  private _range = new BehaviorSubject<number | null>(null);
  private _maxSpeed = new BehaviorSubject<number | null>(null);
  private _price = new BehaviorSubject<number | null>(null);
  private _towHitch = new BehaviorSubject<boolean>(false);
  private _yoke = new BehaviorSubject<boolean>(false);

  private _model = new BehaviorSubject<Model | null>(null);
  private _color = new BehaviorSubject<Color | null>(null);
  private _config = new BehaviorSubject<Config | null>(null);

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    this.initializeForm();
    this.fetchModelsData();
    this.subscribeToDataChanges();
    this.subscribeToModelControlValueChanges();
    this.subscribeToColorControlValueChanges();
    this.subscribeToFormGroupValueChanges();
    this.subscribeToConfigControlValueChanges();
  }

  get form(): FormGroup<ConfiguratorForm> {
    return this._form;
  }

  get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  get disabledSteps(): Observable<DisabledSteps> {
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

  get options(): Observable<Options | null> {
    return this._optionsData.asObservable();
  }

  get range(): Observable<number | null> {
    return this._range.asObservable();
  }

  get maxSpeed(): Observable<number | null> {
    return this._maxSpeed.asObservable();
  }

  get price(): Observable<number | null> {
    return this._price.asObservable();
  }

  get towHitch(): Observable<boolean> {
    return this._towHitch.asObservable();
  }

  get yoke(): Observable<boolean> {
    return this._yoke.asObservable();
  }

  get selectedModel(): Observable<Model> {
    return this._model
      .asObservable()
      .pipe(filter((model: Model | null) => model !== null)) as Observable<Model>;
  }

  get selectedConfig(): Observable<Config> {
    return this._config
      .asObservable()
      .pipe(filter((config: Config | null) => config !== null)) as Observable<Config>;
  }

  get selectedColor(): Observable<Color> {
    return this._color
      .asObservable()
      .pipe(filter((color: Color | null) => color !== null)) as Observable<Color>;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeForm(): void {
    this._form = this.formBuilder.group({
      model: new FormControl<string | null>(null),
      color: new FormControl<string | null>(null), // TODO Add validation, color must be correct for model!
      config: new FormControl<string | null>(null),
      towHitch: new FormControl<boolean | null>(null),
      yoke: new FormControl<boolean | null>(null),
    });
  }

  private fetchModelsData(): void {
    this.subscription.add(
      this.apiService
        .getModels()
        .pipe(
          catchError(() => {
            return of({
              status: Status.Error,
              data: null,
              message: 'Something went wrong...',
            });
          }),
        )
        .subscribe((response: ModelsApiResponse) => {
          if (response.status === Status.Success && response.data !== null) {
            this._modelsData.next(response.data);
          } else {
            // TODO Error
          }
        }),
    );
  }

  private fetchOptionsData(modelCode: string | null): Observable<OptionsApiData | null> {
    if (!modelCode) {
      return of(null);
    } else {
      return this.apiService.getOptions(modelCode).pipe(
        catchError(() => {
          return of({
            status: Status.Error,
            data: null,
            message: 'Something went wrong...',
          });
        }),
        map((response: OptionsApiResponse) => {
          if (response.status === Status.Success) {
            return response.data;
          } else {
            // TODO Error
            throw Error('TODO');
          }
        }),
      );
    }
  }

  private subscribeToDataChanges(): void {
    this.subscription.add(
      this._modelsData.asObservable().subscribe((data: ModelsApiData) => {
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
        this.form.controls['config'].patchValue(null);
        this.form.controls['towHitch'].patchValue(null);
        this.form.controls['yoke'].patchValue(null);

        this._colors.next(
          this._modelsData.getValue().find((item) => item.code === value)?.colors || [],
        );
      }),
    );

    this.subscription.add(
      this.form.controls['model'].valueChanges
        .pipe(
          tap((modelCode: string | null) => {
            this._model.next(
              this._models.getValue()?.find((model) => model.code === modelCode) || null,
            );
          }),
          mergeMap((modelCode: string | null) => this.fetchOptionsData(modelCode)),
        )
        .subscribe((result: OptionsApiData | null) => this._optionsData.next(result)),
    );
  }

  private subscribeToColorControlValueChanges(): void {
    this.subscription.add(
      this.form.controls['color'].valueChanges.subscribe((colorCode: string | null) => {
        if (colorCode === null) {
          this._color.next(null);
        } else {
          const model: (Model & { colors: Color[] }) | undefined = this._modelsData
            .getValue()
            .find((item) => item.code === this._model.getValue()?.code);
          const color: Color | null = model?.colors.find((item) => item.code === colorCode) || null;

          this._color.next(color);
        }
      }),
    );
  }

  private subscribeToConfigControlValueChanges(): void {
    this.subscription.add(
      this.form.controls['config'].valueChanges.subscribe((configId: string | null) => {
        this.form.controls['towHitch'].patchValue(null);
        this.form.controls['yoke'].patchValue(null);

        if (!configId) {
          this._range.next(null);
          this._maxSpeed.next(null);
          this._price.next(null);
          this._towHitch.next(false);
          this._yoke.next(false);
          this._config.next(null);
        } else {
          const options: OptionsApiData | null = this._optionsData.getValue();
          const config: Config | undefined = (options?.configs || []).find(
            (config) => config.id === +configId,
          );

          if (config) {
            this._config.next(config);

            this._range.next(config.range);
            this._maxSpeed.next(config.speed);
            this._price.next(config.price);
            this._towHitch.next(options?.towHitch || false);
            this._yoke.next(options?.yoke || false);

            if (options?.towHitch === false) {
              this.form.controls['towHitch'].patchValue(false);
            }

            if (options?.yoke === false) {
              this.form.controls['yoke'].patchValue(false);
            }
          } else {
            throw Error('Config not found');
          }
        }
      }),
    );

    this.subscription.add(
      this.form.controls['model'].valueChanges
        .pipe(mergeMap((modelCode: string | null) => this.fetchOptionsData(modelCode)))
        .subscribe((result: OptionsApiData | null) => this._optionsData.next(result)),
    );
  }

  private subscribeToFormGroupValueChanges(): void {
    this.subscription.add(
      this.form.valueChanges.subscribe((value) => {
        const model: string = value?.model || '';
        const color: string = value?.color || '';
        const configId: string = value?.config || '';

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

        if (model && color && configId) {
          disabledSteps[3] = false;
        }

        this._disabledSteps.next(disabledSteps);
      }),
    );
  }
}
