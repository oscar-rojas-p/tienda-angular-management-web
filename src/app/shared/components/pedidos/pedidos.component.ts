import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  productosModal: any[] = [];
  productoRegistroDefault: ProductoRegistro = {
    cantidad: 0,
    codProducto: 0,
    precio: 0
  }
  productoRegistro: ProductoRegistro = {...this.productoRegistroDefault}
  
  isOpenModalRegistrarEditar: boolean = false;
  tituloModalRegistrarEditar: string = '';
  isOpenModalEliminar: boolean = false;

  constructor(private Toast: ToastrService){}

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
    if(Object.values(this.productoRegistro).includes(0)){
      this.Toast.info('Registrar un producto y cantidad valida')
    }else{
      this.productosModal.push({...this.productoRegistro})
      this.productoRegistro = {...this.productoRegistroDefault}
    }
  }

}

interface ProductoRegistro{
  codProducto: number;
  cantidad: number;
  precio: number
}
