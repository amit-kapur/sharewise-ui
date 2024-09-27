
import { Component } from "@angular/core";
import { HoldingsComponent } from "../../../holdings/component/holdings/holdings.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'sw-portfolio',
    templateUrl: './portfolio.component.html',
    standalone: true,
    imports: [HoldingsComponent, RouterLink],
})
export class PortfolioComponent {
    

}