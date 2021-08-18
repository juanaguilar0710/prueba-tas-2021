import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    return this.http.get<any>(environment.url + environment.products);
  }

  getCategories(): Observable<any>{
    return this.http.get<any>(environment.url + environment.categories);
  }
  
}
