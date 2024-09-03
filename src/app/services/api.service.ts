import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://localhost:8080/api';


  constructor(private http: HttpClient) {}

  // CLIENTES
  getClientes(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/clientes`);
  }
  createCliente(data: any): Observable<any> {
    return this.http.post(`${this.urlApi}/clientes`, data);
  }
  updateCliente(data: any): Observable<any> {
    return this.http.put(`${this.urlApi}/clientes/${data.id}`, data);
  }
  deleteCliente(data: any): Observable<any> {
    return this.http.delete(`${this.urlApi}/clientes/${data.id}`, data);
  }


  // PRODUCTOS
  getProductos(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/productos`);
  }
  createProducto(data: any): Observable<any> {
    return this.http.post(`${this.urlApi}/productos`, data);
  }
  updateProducto(data: any): Observable<any> {
    return this.http.put(`${this.urlApi}/productos/${data.id}`, data);
  }
  deleteProducto(data: any): Observable<any> {
    return this.http.delete(`${this.urlApi}/productos/${data.id}`, data);
  }


  // PEDIDOS
  getPedidos(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/pedidos`);
  }
  createPedido(data: any): Observable<any> {
    return this.http.post(`${this.urlApi}/pedidos`, data);
  }
  updatePedido(data: any): Observable<any> {
    return this.http.put(`${this.urlApi}/pedidos/${data.id}`, data);
  }
  deletePedido(data: any): Observable<any> {
    return this.http.delete(`${this.urlApi}/pedidos/${data.id}`, data);
  }

}
