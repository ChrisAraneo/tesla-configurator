import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ErrorToastComponent } from './shared/components/error-toast/error-toast.component';
import { Error } from './shared/services/global-error-handler/error.type';
import { GlobalErrorHandlerService } from './shared/services/global-error-handler/global-error-handler.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf, ErrorToastComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected error!: Observable<Error | null>;
  protected isHidden: boolean = true;

  constructor(private readonly globalErrorHandlerService: GlobalErrorHandlerService) {}

  ngOnInit(): void {
    this.initializeErrorObservable();
  }

  hide: () => void = () => {
    this.isHidden = true;
  };

  private initializeErrorObservable(): void {
    this.error = this.globalErrorHandlerService.error.pipe(
      tap(() => {
        this.isHidden = false;
      }),
    );
  }
}
