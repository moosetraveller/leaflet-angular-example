import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('navigator')
  mapElementRef: ElementRef = null!;
  
  routes: Route[] = [];
  currentRoute: string = '';

  private _routerSubscription: Subscription = null!;
  private _router = inject(Router);

  ngOnInit(): void {

    this.routes = this._router.config;
    this.currentRoute = this._router.url;

    this._routerSubscription = this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event as NavigationEnd),
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });

  }

  ngOnDestroy(): void {
    if (this._routerSubscription) {
      this._routerSubscription.unsubscribe();
    }
  }

  navigate(): void {
    const selectedRoute = this.mapElementRef.nativeElement.value;
    this._router.navigate([selectedRoute]);
  }

}
