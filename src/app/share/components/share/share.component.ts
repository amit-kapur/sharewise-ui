import { Component } from "@angular/core";
import { ShareSummaryComponent } from "../share-summary/share-summary.component";


@Component({
    selector: 'sw-share',
    templateUrl: './share.component.html',
    styleUrl: './share.component.scss',
    standalone: true,
    imports: [ShareSummaryComponent]
})
export class ShareComponent {

}