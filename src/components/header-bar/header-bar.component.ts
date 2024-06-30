import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UsersService } from 'src/services/users.service';
import { UserDTO } from '../../models/models-classes';

type BreadNode = Record<string, BreadCorrespondance>;

interface BreadCorrespondance {
  name: string;
  children?: BreadNode;
}

const breadcrumbRoot: BreadNode = {
  diets: {
    name: 'Dietas',
    children: {},
  },
  routines: {
    name: 'Rutinas',
    children: {},
  },
  user: {
    name: 'Usuario',
    children: {},
  },
};

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent {
  @Output() sideNavToggled: EventEmitter<void> = new EventEmitter<void>();

  readonly BREADCRUMB_SEPARATOR = ' > ';
  title: string;
  breadcrumb: string[] = [];

  get user(): UserDTO {
    return this.userService.currentUser;
  }

  constructor(
    public router: Router,
    public userService: UsersService,
    public activatedRoute: ActivatedRoute,
    private modalService: MdbModalService,
  ) {
    this.setBreadcrumb();
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationEnd: {
          this.setBreadcrumb();
        }
      }
    });
  }

  setBreadcrumb() {
    const { url } = this.router;

    const pushNodeToBreadcrumb = (node: BreadNode) => {
      const parent = Object.keys(node).find(key => url.includes(key));
      if (!parent) return;

      const { name, children } = node[parent];
      this.breadcrumb.push(name);
      if (children) pushNodeToBreadcrumb(children);
    };

    this.breadcrumb.length = 0; // Clean array.
    pushNodeToBreadcrumb(breadcrumbRoot);
  }

  toggleSideBar() {
    this.sideNavToggled.next();
  }
}
