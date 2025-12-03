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
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [HousingLocation, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Home {
  private readonly _housingService = inject(HousingService);

  // Um BehaviorSubject é uma classe especial da biblioteca RxJS usada em Angular que funciona como um Observable (observável) mas com uma diferença chave: ele sempre mantém e emite o último valor que foi emitido. Isso significa que qualquer novo assinante que se inscreva no BehaviorSubject receberá imediatamente o valor mais recente, mesmo que a emissão tenha acontecido antes da subscrição. Ele requer um valor inicial, tornando-o ideal para cenários onde você precisa que um novo assinante receba um estado atual imediatamente.
  filterInput$ = new BehaviorSubject<string>('');
  housingLocationList$: Observable<HousingLocationInfo[]> =
    this._housingService.getAllHousingLocations();

  // combineLatest é um operador do RxJS no Angular que combina vários Observables e emite um array ou objeto com os valores mais recentes de cada um deles sempre que um dos Observables de entrada emitir um valor.
  filteredLocationList$: Observable<HousingLocationInfo[]> = combineLatest([
    this.housingLocationList$,
    this.filterInput$,
  ]).pipe(
    map(([list, text]) => {
      if (!text.trim()) return list;
      return list.filter((item) => item.city.toLowerCase().includes(text.toLowerCase()));
    })
  );

  filterResults(text: string) {
    // Emissão de novos valores no BehaviorSubject: Novos valores podem ser emitidos usando o método next(). Então, todos os assinantes recebem o valor sempre que next() é chamado, o novo valor é enviado para todos os assinantes ativos.
    this.filterInput$.next(text);
  }
}
