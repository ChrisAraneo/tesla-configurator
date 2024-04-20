import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParagraphComponent } from '../paragraph/paragraph.component';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [TitleComponent, ParagraphComponent, NgIf, RouterLink],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.scss',
})
export class ErrorToastComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() button: string = '';
  @Input() onClick: (() => void | Promise<void>) | undefined;

  protected readonly warning = '\u26A0';
}
