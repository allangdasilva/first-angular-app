import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../../interfaces/housinglocation';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Home implements OnInit {
  housingLocationList: HousingLocationInfo[] = [];
  filteredLocationList: HousingLocationInfo[] = [];
  readonly _housingService = inject(HousingService);
  readonly _cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this._housingService.getAllHousingLocations().subscribe((response) => {
      this.housingLocationList = response;
      this.filteredLocationList = response;
      this._cdr.markForCheck();
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) => {
      return housingLocation.city.toLowerCase().includes(text.toLowerCase());
    });
  }
}
