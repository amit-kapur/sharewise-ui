import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { userProfileActions } from '../store/actions';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectData, selectError, selectIsLoading } from '../../userProfile/store/reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sw-user-profile',
  templateUrl: './userProfile.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class UserProfileComponent implements OnInit {
  slug: string = '';
  route = inject(ActivatedRoute);
  store = inject(Store);

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectData),
    // isCurrentUser: true // TODO
  })

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }));
  }
}
