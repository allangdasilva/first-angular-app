import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { HousingLocationInfo } from '../../interfaces/housinglocation';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  // ActivatedRoute dá acesso às informações da rota atual.
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocation: HousingLocationInfo | undefined;
  readonly _housingService = inject(HousingService);
  readonly _cdr = inject(ChangeDetectorRef);

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this._housingService.getHousingLocationById(housingLocationId).subscribe((response) => {
      this.housingLocation = response;
      this._cdr.markForCheck();
    });
  }

  submitApplication() {
    this._housingService.submitApplication(
      // O operador de coalescência nula (??) é um operador lógico que retorna o seu operando do lado direito quando o seu operador do lado esquerdo é null ou undefined.
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
