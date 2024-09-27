
import { Component } from "@angular/core";
import { HoldingsComponents } from "../../../holdings/component/holdings/holdings.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'sw-portfolio',
    templateUrl: './portfolio.component.html',
    standalone: true,
    imports: [HoldingsComponents, RouterLink],
})
export class PortfolioComponent {
    

}