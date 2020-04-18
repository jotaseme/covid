import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {

  @Input() communitySelected$: Observable<string>;

  constructor() { }

  ngOnInit() {
  }

  onSelectorClicked($event: MouseEvent) {
    
  }
}
