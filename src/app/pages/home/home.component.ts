import { Component, Input } from '@angular/core';
import { UserDTO } from 'src/models/models-classes';
import { EnumsService } from 'src/services/enums.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @Input() weeklySteps: number[] = [];
  @Input() weeklyCalories: number[] = [];
  loaderImg = 'assets/imgs/loader.svg';

  get user(): UserDTO {
    return this.usersService.currentUser;
  }

  constructor(
    private usersService: UsersService,
    public enumsService: EnumsService,
  ) {}
}
