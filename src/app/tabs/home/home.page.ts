import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public communities;
    public communitySelected = new BehaviorSubject<string>('Total');

    constructor() {
    }

    ngOnInit(): void {
    }

    onCommunitySelected(event: string) {
        this.communitySelected.next(event == 'España' ? 'Total' : event);
    }
}
