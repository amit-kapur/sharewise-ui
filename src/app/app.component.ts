import { CommonModule } from '@angular/common';
import { ApplicationRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { NavComponent } from './shared/components/nav/nav.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './auth/components/login/login.component';
import { CurrentUserInterface } from './shared/types/currentUser.interface';
import { first } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NavComponent,
    BannerComponent,
    FooterComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  applicationRef = inject(ApplicationRef);

  ngOnInit(): void {
    this.init();
    this.applicationRef.isStable.pipe(first((isStable) => isStable)).subscribe(() => {
      // Note that we don't need to use `runOutsideAngular` because `isStable`
      // emits events outside of the Angular zone when it's truthy (falsy values
      // are emitted inside the Angular zone).
      setInterval(() => this.init(), 1000);
    });
  }

  init() : void {
    this.authService.user$.subscribe(
      (user: CurrentUserInterface) => {
        if (user) {
          this.authService.currentUserSig.set({
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName!,
          });
        } else {
          this.authService.currentUserSig.set(null);
        }
        // console.log('AppComponent currentUserSig: ',this.authService.currentUserSig());
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
