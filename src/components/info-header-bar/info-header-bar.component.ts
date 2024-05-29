import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/models/models-classes';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-info-header-bar',
  templateUrl: './info-header-bar.component.html',
  styleUrls: ['./info-header-bar.component.scss'],
})
export class InfoHeaderBarComponent {
  get user(): UserDTO {
    return this.userService.currentUser;
  }

  constructor(
    public router: Router,
    public userService: UsersService,
  ) {}
}
