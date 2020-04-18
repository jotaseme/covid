import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SpainDataService } from '../../../../services/spain-data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  @Output() communitySelected = new EventEmitter<string>();

  public summary;

  public spainData;

  public communities = [
    "España", "Madrid", "Cataluña", "Castilla-La Mancha", "Castilla y León", "País Vasco", "C. Valenciana","Andalucía",
    "La Rioja", "Galicia", "Extremadura", "Aragón", "Navarra", "Asturias", "Cantabria", "Baleares", "Murcia",
    "Canarias", "Ceuta", "Melilla"];

  constructor(private spainDataService: SpainDataService) { }

  ngOnInit() {
    this.spainDataService.getSpainCasesByCommunities$().subscribe(res => {
      this.spainData = (res as {data}).data[0].table;
      this.summary = this.spainData.find(res => {
        return res.Community === 'España'
      });
    })
  }

  onSelectorChange(event: any) {
    this.summary = this.spainData.find(res => res.Community === event.detail.value);
    this.communitySelected.next(event.detail.value);
  }
}
