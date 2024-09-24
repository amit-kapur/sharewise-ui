import { Component, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../auth/services/auth.service";


@Component({
  selector: 'sw-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  imports: [RouterLink]
})
export class NavComponent implements OnInit {

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (user: { email: string; displayName: string }) => {
        if (user) {
          this.authService.currentUserSig.set({
            email: user.email!,
            username: user.displayName!,
          });
        } else {
          this.authService.currentUserSig.set(null);
        }
        console.log('currentUserSig -> ', this.authService.currentUserSig());
      }
    );
  }

  logout(): void {
    console.log('logout');
    this.authService.logout();
  }
}
