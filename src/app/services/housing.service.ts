import { inject, Injectable, OnInit } from '@angular/core';
import { HousingLocationInfo } from '../interfaces/housinglocation';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private readonly _httpClient = inject(HttpClient);

  url = 'http://localhost:3000/locations';

  getAllHousingLocations(): Observable<HousingLocationInfo[]> {
    return this._httpClient.get<HousingLocationInfo[]>(this.url);
  }
  getHousingLocationById(id: number): Observable<HousingLocationInfo> {
    return this._httpClient
      .get<HousingLocationInfo[]>(`${this.url}?id=${id}`)
      .pipe(map((result) => result[0]));
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Home application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}`
    );
  }
}
