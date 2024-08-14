import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export default class ProductosComponent {
  items = Array(100).fill(null);
  tituloModalRegistro: string = '';
  isOpenModalRegistro: boolean = false;
  isOpenModalEliminar: boolean = false;

  // Registro
  nombreProducto: string = '';


  openModalRegistro(titulo: string){
    this.tituloModalRegistro = titulo;
    this.isOpenModalRegistro = true;
  }
  closeModalRegistro(){
    this.isOpenModalRegistro = false;
  }

  openModalEliminar(){
    this.isOpenModalEliminar = true;
  }
  closeModalEliminar(){
    this.isOpenModalEliminar = false;
  }
}
