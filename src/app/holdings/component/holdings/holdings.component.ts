import { Component } from "@angular/core";
import { PortfolioComponent } from "../../../dashboard/components/portfolio/portfolio.component";



@Component({
    selector: 'sw-holdings',
    templateUrl: './holdings.component.html',
    standalone: true,
    imports: [PortfolioComponent]
})
export class HoldingsComponents {

}