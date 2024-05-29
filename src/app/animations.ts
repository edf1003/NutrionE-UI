import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
  transition(':leave', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
]);

export const fadeInOut1000ms = trigger('fadeInOut1000ms', [
  transition(':enter', [style({ opacity: 0 }), animate('1000ms 500ms', style({ opacity: 1 }))]),
  transition(':leave', [style({ opacity: 1 }), animate('1000ms 500ms', style({ opacity: 0 }))]),
]);
