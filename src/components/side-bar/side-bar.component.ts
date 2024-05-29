import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { fadeInEnterAnimation } from 'mdb-angular-ui-kit/animations';
import { UsersService } from '../../services/users.service';
import { UserDTO } from 'src/models/models-classes';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  animations: [fadeInEnterAnimation()],
})
export class SideBarComponent {
  currentDate: Date = new Date();
  section: string;
  url: string;

  get user(): UserDTO {
    return this.userService.currentUser;
  }

  constructor(
    public router: Router,
    public userService: UsersService,
  ) {
    this.setUrl();
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationEnd: {
          this.setUrl();
        }
      }
    });
  }

  setUrl() {
    if (this.router.url.includes('home')) {
      this.url = 'home';
    } else if (this.router.url.includes('diets')) {
      this.url = 'diets';
    } else if (this.router.url.includes('routines')) {
      this.url = 'routines';
    } else if (this.router.url.includes('user')) {
      this.url = 'user';
    }
  }
}
