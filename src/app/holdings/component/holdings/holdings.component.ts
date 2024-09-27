import { Component } from "@angular/core";
import { PortfolioComponent } from "../../../dashboard/components/portfolio/portfolio.component";
import { RouterLink } from "@angular/router";
import { ShareComponent } from "../../../share/components/share.component";



@Component({
    selector: 'sw-holdings',
    templateUrl: './holdings.component.html',
    standalone: true,
    imports: [ShareComponent, RouterLink, PortfolioComponent]
})
export class HoldingsComponent {

}