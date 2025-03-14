import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: '[app-custom-toast-component]',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.scss'],
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          opacity: 0,
        }),
      ),
      transition(
        'inactive => active',
        animate(
          '500ms ease-out',
          keyframes([
            style({
              transform: 'translate3d(100%, 0, 0) skewX(-20deg)',
              opacity: 0,
            }),
            style({
              transform: 'skewX(10deg)',
              opacity: 0.5,
            }),
            style({
              transform: 'skewX(-5deg)',
              opacity: 1,
            }),
            style({
              transform: 'none',
              opacity: 1,
            }),
          ]),
        ),
      ),
      transition(
        'active => removed',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              opacity: 1,
            }),
            style({
              transform: 'translate3d(100%, 0, 0) skewX(30deg)',
              opacity: 0,
            }),
          ]),
        ),
      ),
    ]),
  ],
  preserveWhitespaces: false,
})
export class CustomToastComponent extends Toast {
  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    this.toastPackage.triggerAction();
    return false;
  }
}
