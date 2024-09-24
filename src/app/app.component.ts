import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { NavComponent } from './shared/components/nav/nav.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './auth/components/login/login.component';
import { CurrentUserInterface } from './shared/types/currentUser.interface';


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

  ngOnInit(): void {
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
        console.log('AppComponent currentUserSig: ',this.authService.currentUserSig());
      }
    );
  }

  logout(): void {
    console.log('logout');
    this.authService.logout();
  }
}
