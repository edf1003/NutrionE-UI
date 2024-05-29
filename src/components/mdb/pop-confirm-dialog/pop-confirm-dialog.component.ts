import { Component, Input } from '@angular/core';
import { MdbPopconfirmRef } from 'mdb-angular-ui-kit/popconfirm';
import { finalize, isObservable, take } from 'rxjs';

@Component({
  selector: 'app-pop-confirm-dialog',
  templateUrl: './pop-confirm-dialog.component.html',
  styleUrls: ['./pop-confirm-dialog.component.scss'],
})
export class PopConfirmDialogComponent {
  executing = false;

  //default title
  @Input() title = '¿Confirmar la operación?';
  @Input() text = '';
  @Input() acceptText = 'Confirmar';
  @Input() cancelText = 'Atrás';
  @Input() acceptClass = 'btn btn-primary';
  @Input() cancelClass = 'btn btn-flat';

  @Input() hideCancel = false;

  @Input() accept: () => unknown;
  @Input() cancel: () => unknown;

  constructor(public popconfirmRef: MdbPopconfirmRef<PopConfirmDialogComponent>) {}

  executeAccept() {
    if (this.executing) return;
    if (!this.accept) {
      this.popconfirmRef.confirm();
      return;
    }

    this.executing = true;
    const acceptResult = this.accept();
    if (this.isPromise(acceptResult)) {
      //promise
      (acceptResult as Promise<unknown>).then(
        r => {
          this.popconfirmRef.confirm(r);
          this.executing = false;
        },
        () => (this.executing = false),
      );
    } else if (isObservable(acceptResult)) {
      //observable
      acceptResult
        .pipe(
          take(1),
          finalize(() => (this.executing = false)),
        )
        .subscribe(r => this.popconfirmRef.confirm(r));
    } else if (acceptResult) {
      //boolean
      this.executing = false;
      this.popconfirmRef.confirm();
    }
  }

  executeCancel() {
    if (this.executing) return;
    if (!this.cancel) {
      this.popconfirmRef.close();
      return;
    }
    this.executing = true;
    const cancelResult = this.cancel();
    if (this.isPromise(cancelResult)) {
      //promise
      (cancelResult as Promise<unknown>).then(
        r => {
          this.popconfirmRef.close(r);
          this.executing = false;
        },
        () => (this.executing = false),
      );
    } else if (isObservable(cancelResult)) {
      //observable
      cancelResult
        .pipe(
          take(1),
          finalize(() => (this.executing = false)),
        )
        .subscribe(r => this.popconfirmRef.close(r));
    } else if (cancelResult) {
      //boolean
      this.executing = false;
      this.popconfirmRef.close();
    }
  }

  private isPromise(p) {
    if (typeof p === 'object' && typeof p.then === 'function') {
      return true;
    }
    return false;
  }
}
