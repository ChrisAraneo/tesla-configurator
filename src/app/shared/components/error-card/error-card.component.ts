import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParagraphComponent } from '../paragraph/paragraph.component';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-error-card',
  standalone: true,
  imports: [TitleComponent, ParagraphComponent, NgIf, RouterLink],
  templateUrl: './error-card.component.html',
  styleUrl: './error-card.component.scss',
})
export class ErrorCardComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() button: string = '';
  @Input() onClick: (() => void | Promise<void>) | undefined;

  protected readonly warning = '\u26A0';
}
