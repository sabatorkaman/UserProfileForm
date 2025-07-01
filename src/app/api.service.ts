import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient)

  constructor() {
  }

  getcountry(): Observable<GetCountryResponse> {
    return this.http.get<GetCountryResponse>('https://countriesnow.space/api/v0.1/countries/flag/images')
  }
}

export interface GetCountryResponse {
  error: false,
  msg: "",
  data: Country[]
}

export interface Country {
  flag: "",
  iso2: "",
  iso3: "",
  name: ""
}
