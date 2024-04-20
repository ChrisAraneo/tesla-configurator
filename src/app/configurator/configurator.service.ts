import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isNull } from 'lodash';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  catchError,
  combineLatest,
  distinct,
  filter,
  first,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { ApiService } from '../shared/services/api/api.service';
import { ApiResponse } from '../shared/services/api/types/api-response.type';
import { Color } from '../shared/services/api/types/color.type';
import { Config } from '../shared/services/api/types/config.type';
import { Model } from '../shared/services/api/types/model.type';
import { ModelsApiData } from '../shared/services/api/types/models-api-data.type';
import { ModelsApiResponse } from '../shared/services/api/types/models-api-response.type';
import { ProcessedOptionsApiData } from '../shared/services/api/types/processed-options-api-data.type';
import { Status } from '../shared/services/api/types/status.type';
import { Error } from '../shared/services/global-error-handler/error.type';
import { ConfiguratorForm } from './shared/types/configurator-form.type';
import { DisabledSteps } from './shared/types/disabled-steps.type';
import { ExtraOption } from './shared/types/extra-option.type';
import { Image } from './shared/types/image.type';
import { Options } from './shared/types/options.type';
import { createExtraAvailableValidator } from './shared/validators/extra-available.validator';
import { createOthersRequiredValidator } from './shared/validators/other-requires.validator';
import { createValueValidator } from './shared/validators/value.validator';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService implements OnDestroy {
  private _form!: FormGroup<ConfiguratorForm>;

  private _loading = new BehaviorSubject<boolean>(true);
  private _error = new Subject<Error>();
  private _disabledSteps = new BehaviorSubject<DisabledSteps>({ 1: true, 2: true, 3: true });

  private _modelsData = new BehaviorSubject<ModelsApiData>([]);
  private _optionsData = new BehaviorSubject<Options | null>(null);

  private _models = new BehaviorSubject<Model[]>([]);
  private _colors = new BehaviorSubject<Color[]>([]);
  private _image = new BehaviorSubject<Image | null>(null);
  private _range = new BehaviorSubject<number | null>(null);
  private _maxSpeed = new BehaviorSubject<number | null>(null);
  private _price = new BehaviorSubject<number | null>(null);
  private _towHitch = new BehaviorSubject<ExtraOption | null>(null);
  private _yoke = new BehaviorSubject<ExtraOption | null>(null);

  private _model = new BehaviorSubject<Model | null>(null);
  private _color = new BehaviorSubject<Color | null>(null);
  private _config = new BehaviorSubject<Config | null>(null);

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
  ) {
    this.initializeForm();
    this.updateFormValidators();

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

  get error(): Observable<Error> {
    return this._error.asObservable();
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

  get towHitch(): Observable<ExtraOption | null> {
    return this._towHitch.asObservable();
  }

  get yoke(): Observable<ExtraOption | null> {
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

  reload(): void {
    this.fetchModelsData();

    this.subscription.add(
      this._modelsData.pipe(first()).subscribe(() => {
        this.form.setValue({
          model: null,
          color: null,
          config: null,
          towHitch: null,
          yoke: null,
        });

        this.router.navigateByUrl('');
      }),
    );
  }

  private initializeForm(): void {
    this._form = this.formBuilder.group({
      model: new FormControl<string | null>(null),
      color: new FormControl<string | null>(null),
      config: new FormControl<number | null>(null),
      towHitch: new FormControl<boolean | null>(null),
      yoke: new FormControl<boolean | null>(null),
    });
  }

  private updateFormValidators(
    models: Model[] = [],
    colors: Color[] = [],
    options: Options | null = null,
  ): void {
    this._form.controls.model.clearValidators();
    this._form.controls.model.addValidators([
      Validators.required,
      createValueValidator<string>(models.map((item: Model) => item.code)),
    ]);

    this._form.controls.color.clearValidators();
    this._form.controls.color.addValidators([
      Validators.required,
      createValueValidator<string>(colors.map((item: Color) => item.code)),
      createOthersRequiredValidator([this._form.controls.model]),
    ]);

    this._form.controls.config.clearValidators();
    this._form.controls.config.addValidators([
      Validators.required,
      createValueValidator<number>(
        options !== null ? options.configs.map((item: Config) => item.id) : [],
      ),
      createOthersRequiredValidator([this._form.controls.model, this._form.controls.color]),
    ]);

    this._form.controls.towHitch.clearValidators();

    if (options?.towHitch.enabled) {
      this._form.controls.towHitch.addValidators([
        createExtraAvailableValidator(!!options?.towHitch.enabled),
        createOthersRequiredValidator([this._form.controls.config]),
      ]);
    }

    this._form.controls.yoke.clearValidators();

    if (options?.yoke.enabled) {
      this._form.controls.yoke.addValidators([
        createExtraAvailableValidator(!!options?.yoke.enabled),
        createOthersRequiredValidator([this._form.controls.config]),
      ]);
    }

    this._form.updateValueAndValidity();
  }

  private fetchModelsData(): void {
    this.subscription.add(
      this.apiService
        .getModels()
        .pipe(
          first(),
          catchError(() => {
            return of({
              status: Status.Error,
              data: null,
              message: 'Something went wrong...',
            });
          }),
        )
        .subscribe((response: ModelsApiResponse) => {
          this._loading.next(false);

          if (response.status === Status.Success && response.data !== null) {
            this._modelsData.next(response.data);
          } else {
            this._error.next({
              message: response.message,
            });
          }
        }),
    );
  }

  private fetchOptionsData(modelCode: string | null): Observable<ProcessedOptionsApiData | null> {
    if (modelCode === null) {
      return of(null);
    } else {
      return this.apiService.getOptions(modelCode).pipe(
        first(),
        catchError(() => {
          return of({
            status: Status.Error,
            data: null,
            message: 'Something went wrong...',
          });
        }),
        map((response: ApiResponse<ProcessedOptionsApiData>) => {
          this._loading.next(false);

          if (response.status === Status.Success) {
            return response.data;
          } else {
            this._error.next({ message: response.message });

            return null;
          }
        }),
      );
    }
  }

  private subscribeToDataChanges(): void {
    this.subscription.add(
      this._modelsData.asObservable().subscribe((data: ModelsApiData) => {
        this._models.next(data.map((item) => ({ code: item.code, description: item.description })));
      }),
    );
  }

  private subscribeToModelControlValueChanges(): void {
    this.subscription.add(
      this.form.controls['model'].valueChanges
        .pipe(
          tap(() => {
            this.form.controls['color'].patchValue(null);
            this.form.controls['config'].patchValue(null);
            this.form.controls['towHitch'].patchValue(null);
            this.form.controls['yoke'].patchValue(null);
          }),
          tap((modelCode: string | null) => {
            this._model.next(
              modelCode === null
                ? null
                : this._models.getValue()?.find((model) => model.code === modelCode) || null,
            );
          }),
          tap((modelCode: string | null) => {
            this._colors.next(
              modelCode === null
                ? []
                : this._modelsData.getValue().find((item) => item.code === modelCode)?.colors || [],
            );
          }),
          mergeMap((modelCode: string | null) => this.fetchOptionsData(modelCode)),
          tap((data: ProcessedOptionsApiData | null) => {
            this._optionsData.next(data);
          }),
        )
        .subscribe(),
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
      this.form.controls['config'].valueChanges.subscribe((configId: string | number | null) => {
        this.form.controls.towHitch.reset();
        this.form.controls.yoke.reset();

        if (isNull(configId)) {
          this._range.next(null);
          this._maxSpeed.next(null);
          this._price.next(null);
          this._towHitch.next(null);
          this._yoke.next(null);
          this._config.next(null);
        } else {
          const options: ProcessedOptionsApiData | null = this._optionsData.getValue();
          const config: Config | undefined = (options?.configs || []).find(
            (config) => config.id === +configId,
          );

          if (config) {
            this._config.next(config);

            this._range.next(config.range);
            this._maxSpeed.next(config.speed);
            this._price.next(config.price);
            this._towHitch.next(options?.towHitch || null);
            this._yoke.next(options?.yoke || null);

            if (options?.towHitch?.enabled === false) {
              this.form.controls['towHitch'].patchValue(false);
            }

            if (options?.yoke?.enabled === false) {
              this.form.controls['yoke'].patchValue(false);
            }
          } else {
            throw Error('Config not found');
          }
        }
      }),
    );
  }

  private subscribeToFormGroupValueChanges(): void {
    this.subscription.add(
      combineLatest([
        this.form.controls.model.valueChanges,
        this.form.controls.color.valueChanges,
        this.form.controls.config.valueChanges,
        this.form.controls.towHitch.valueChanges,
        this.form.controls.yoke.valueChanges,
      ])
        .pipe(
          distinct(),
          map((values) => {
            const [modelCode, colorCode] = values;
            const disabledSteps: DisabledSteps = { 1: false, 2: true, 3: true };

            this._form.updateValueAndValidity();

            if (this._form.controls.model.valid && this._form.controls.color.valid) {
              this._image.next({
                src: `assets/${modelCode?.toLocaleLowerCase()}-${colorCode?.toLocaleLowerCase()}.jpg`,
                alt: `Tesla car model ${modelCode} in color ${colorCode}`,
              });

              disabledSteps[2] = false;
            } else {
              this._image.next(null);
            }

            if (this._form.valid) {
              disabledSteps[3] = false;
            }

            this._disabledSteps.next(disabledSteps);
          }),
        )
        .subscribe(),
    );

    this.subscription.add(
      combineLatest([this._models, this._colors, this._optionsData]).subscribe((values) => {
        const [models, colors, options] = values;

        this.updateFormValidators(models, colors, options);
      }),
    );
  }
}
