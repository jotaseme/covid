import {Component, OnInit} from '@angular/core';
import { SpainDataService } from '../../services/spain-data.service';
import { BehaviorSubject } from 'rxjs';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public communities;
    public communitySelected = new BehaviorSubject<string>('Total');

    constructor(private spainDataService: SpainDataService) {
    }

    ngOnInit(): void {
        this.spainDataService.getAll$().subscribe(res => {
            this.communities = res;
        });
    }

    onCommunitySelected(event: string) {
        this.communitySelected.next(event == 'España' ? 'Total' : event);
    }
}
