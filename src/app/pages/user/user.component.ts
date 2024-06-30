import { Component } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EditUserModalComponent } from 'src/modals/edit-user-modal/edit-user-modal.component';
import { UserDTO } from 'src/models/models-classes';
import { EnumsService } from 'src/services/enums.service';
import { GoogleFitService } from 'src/services/google-fit.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  get user(): UserDTO {
    return this.usersService.currentUser;
  }

  constructor(
    private usersService: UsersService,
    public enumsService: EnumsService,
    private modalService: MdbModalService,
    private googleFitService: GoogleFitService,
  ) {}

  editUser() {
    this.modalService.open(EditUserModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-dialog-scrollable modal-fullscreen-right',
      data: { user: this.user },
    });
  }

  getCredentials() {
    this.googleFitService.getCredentials().subscribe();
  }
}
