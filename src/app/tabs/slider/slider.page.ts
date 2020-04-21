import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SpainDataService} from '../../services/spain-data.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {

  constructor(private router: Router, private spainDataService: SpainDataService) { }

  ngOnInit() {
    this.spainDataService.getBannerImage$();
  }

  goToWelcome(){
    this.router.navigate(['/welcome']);
  }

}
