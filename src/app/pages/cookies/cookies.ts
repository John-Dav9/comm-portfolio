import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.html',
  styleUrl: './cookies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cookies {}
