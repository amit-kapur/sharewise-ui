import { Component } from "@angular/core";
import { PortfolioComponent } from "../../../dashboard/components/portfolio/portfolio.component";
import { RouterLink } from "@angular/router";



@Component({
    selector: 'sw-holdings',
    templateUrl: './holdings.component.html',
    standalone: true,
    imports: [PortfolioComponent, RouterLink]
})
export class HoldingsComponent {

}