import { Location } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MdbSidenavComponent } from 'mdb-angular-ui-kit/sidenav';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UsersService } from 'src/services/users.service';
import { ObsAlertsService } from '../services/obs-alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [],
})
export class AppComponent implements OnInit {
  logoutSub: Subscription;
  loaderImg = 'assets/imgs/loader.svg';

  navigating = false;
  loadingApp = true;
  currentDate: Date;
  get user() {
    return this.userService.currentUser;
  }

  @ViewChild('sidenav') sidenav: MdbSidenavComponent;
  sideNavOptions = { hidden: true, mode: 'side' };
  sideNavLocked = false;
  readonly SIDENAV_BREAKPOINT = 660;

  constructor(
    public obsAlertsSrv: ObsAlertsService,
    public router: Router,
    public userService: UsersService,
    private location: Location,
  ) {
    this.currentDate = new Date();
    void this.router.navigate(['/home']);
    if (window.innerWidth > this.SIDENAV_BREAKPOINT) this.sideNavOptions = { hidden: false, mode: 'side' };
  }

  ngOnInit(): void {
    if (!this.user)
      this.userService
        .getCurrentUser()
        .pipe(
          finalize(() => {
            this.appHasLoaded();
          }),
        )
        .subscribe();
    void this.router.navigate(['/home']);
  }

  isLogin() {
    return this.router?.url?.startsWith('/login');
  }

  @HostListener('window:resize', ['$event'])
  setMode() {
    if (!this.sidenav) return;
    if (window.innerWidth < this.SIDENAV_BREAKPOINT) {
      this.sidenav.hide();
    } else if (!this.sideNavLocked) {
      this.sidenav.show();
    }
  }

  lockSideBar() {
    if (window.innerWidth < this.SIDENAV_BREAKPOINT) {
      this.sideNavLocked = false;
    } else {
      this.sideNavLocked = !this.sideNavLocked;
    }
  }

  private appHasLoaded() {
    this.loadingApp = false;
    //this.auth.appLoadEvents.next(true);
  }

  routeNavigation(router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.navigating = true;
      } else if (event instanceof NavigationEnd) {
        if (window) {
          scrollTo(0, 0);
        }
        this.setMode();
        this.navigating = false;
      } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
        this.navigating = false;
      }
    });
  }
}
