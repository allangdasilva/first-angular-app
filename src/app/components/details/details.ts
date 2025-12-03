import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { HousingLocationInfo } from '../../interfaces/housinglocation';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  // ActivatedRoute dá acesso às informações da rota atual.
  private route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _housingService = inject(HousingService);

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  housingLocationId = Number(this.route.snapshot.params['id']);
  housingLocation$: Observable<HousingLocationInfo> = this._housingService.getHousingLocationById(
    this.housingLocationId
  );

  submitApplication() {
    this._housingService.submitApplication(
      // O operador de coalescência nula (??) é um operador lógico que retorna o seu operando do lado direito quando o seu operador do lado esquerdo é null ou undefined.
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
