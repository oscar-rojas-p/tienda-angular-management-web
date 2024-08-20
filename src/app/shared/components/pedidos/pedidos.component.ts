import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    FormsModule
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export default class PedidosComponent {
  items = Array(100).fill(null);
  
  isOpenModalRegistrarEditar: boolean = false;
  tituloModalRegistrarEditar: string = '';
  
  isOpenModalEliminar: boolean = false;
  
  productosModal: any[] = [];
  
  productoRegistroDefault: ProductoRegistro = {
    cantidad: 0,
    codProducto: 0,
    precio: 0
  }
  productoRegistro: ProductoRegistro = {...this.productoRegistroDefault}


  openModalRegistrarEditar(titulo: string){
    this.tituloModalRegistrarEditar = titulo;
    this.isOpenModalRegistrarEditar = true;
  }
  closeModalRegistrarEditar(){
    this.isOpenModalRegistrarEditar = false;
  }

  openModalEliminar(){
    this.isOpenModalEliminar = true;
  }
  closeModalEliminar(){
    this.isOpenModalEliminar = false;
  }


  agregarProducto(){
    this.productosModal.push({...this.productoRegistro})
    this.productoRegistro = {...this.productoRegistroDefault}
  }

}

interface ProductoRegistro{
  codProducto: number;
  cantidad: number;
  precio: number
}
