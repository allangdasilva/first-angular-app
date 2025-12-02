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

  // O constructor é executado automaticamente quando o componente é criado.
  // Ele é usado para inicializar valores iniciais da classe antes do template ser renderizado.
  // Aqui, ao criar o componente, já carregamos a lista de localizações usando o serviço.
  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
