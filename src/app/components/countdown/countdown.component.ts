import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownComponent {
  @Input() deadline: Date = new Date();

  remainingTime = remainingTime(this.deadline);

  formatRemainingTime = formatRemainingTime;

  // https://angular.io/api/core/ChangeDetectorRef#usage-notes
  constructor(private ref: ChangeDetectorRef) {
    setInterval(() => {
      this.remainingTime = remainingTime(this.deadline);
      // require view to be updated
      this.ref.markForCheck();
    }, 1000);
  }
}

interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function remainingTime(date: Date): RemainingTime {
  const now = new Date();
  const nowSec = Math.floor(now.getTime() / 1000);
  const dateSec = Math.floor(date.getTime() / 1000);
  const remainingSec = dateSec - nowSec;

  const days = Math.floor(remainingSec / (24 * 60 * 60));
  const hours = Math.floor((remainingSec % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((remainingSec % (60 * 60)) / 60);
  const seconds = Math.floor(remainingSec % 60);

  // return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  return { days, hours, minutes, seconds };
}

function formatRemainingTime(remainingTime: RemainingTime): string {
  const { days, hours, minutes, seconds } = remainingTime;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
