import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HelloBannerComponent } from "../hello-banner/hello-banner.component";
import { AddPortfolioComponent } from "../add-portfolio/add-portfolio.component";
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'sw-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [NgFor, CommonModule, HelloBannerComponent, AddPortfolioComponent, PortfolioComponent],
})
export class DashboardComponent {
  firestore: Firestore = inject(Firestore);
  portfolios$: Observable<any[]>;
  robots: any;

  constructor() {
    // TODO: 
    const aCollection = collection(this.firestore, '/Users/vPIyuTEfwradYwF047rFuE0UVbl1/Portfolio');
    this.portfolios$ = collectionData(aCollection);
   
  }
}
