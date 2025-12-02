import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../../interfaces/housinglocation';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  housingLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);

  // A função do construtor é criar e inicializar um novo objeto a partir da classe.
  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
