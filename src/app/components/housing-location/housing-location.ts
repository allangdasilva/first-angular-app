import { Component, input } from '@angular/core';
import { HousingLocationInfo } from '../../interfaces/housinglocation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  imports: [RouterLink],
  templateUrl: './housing-location.html',
  styleUrl: './housing-location.css',
})
export class HousingLocation {
  // Invoque o método required no input para indicar que o componente pai deve fornecer um valor.
  // required() garante que o TypeScript imponha isso e trate a propriedade como não nula quando este componente for usado em um modelo.
  housingLocation = input.required<HousingLocationInfo>();
  ngOnInit() {
    console.log('teste');
  }
}
