import { animate, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
]);

export const fadeInSlow = trigger('fadeInSlow', [
  transition(':enter', [style({ opacity: 0 }), animate('600ms', style({ opacity: 1 }))]),
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
]);

export const productsFadeIn = trigger('productsFadeIn', [
  transition('false => true', [style({ opacity: 0 }), animate('600ms', style({ opacity: 1 }))]),
]);

export const fadeInUpOutDown = trigger('fadeInUpOutDown', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translate3d(0, 100%, 0)' }),
    animate('500ms', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }),
    animate('500ms', style({ opacity: 0, transform: 'translate3d(0, 100%, 0)' })),
  ]),
]);

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translate3d(0, 100%, 0)' }),
    animate('500ms', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })),
  ]),
]);
