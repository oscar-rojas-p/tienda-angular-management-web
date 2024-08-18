import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://localhost:8080/api';


  constructor(private http: HttpClient) {}

  getClientes(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/clientes`);
  }

  createCliente(data: any): Observable<any> {
    return this.http.post(`${this.urlApi}/clientes`, data);
  }


}
