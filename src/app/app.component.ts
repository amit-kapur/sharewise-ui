import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'sharewise-ui';
  authService = inject(AuthService);

  ngOnInit(): void {
      this.authService.user$.subscribe((user: { email: string; displayName: string; }) => {
        if(user){
          this.authService.currentUserSig.set({
            email: user.email!,
            username: user.displayName!,
          })
        } else {
          this.authService.currentUserSig.set(null);
        }
        console.log(this.authService.currentUserSig())
      })
  }

  logout(): void {
    console.log('logout');
    this.authService.logout();

  }
}
