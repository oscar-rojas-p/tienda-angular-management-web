import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export default class ClientesComponent {
  items = Array(100).fill(null);
  isOpenRegistro: boolean = false;
  isOpenEliminar: boolean = false;
  tituloModalRegistro: string = '';

  openModalRegistro(titulo: string){
    this.isOpenRegistro = true;
    this.tituloModalRegistro = titulo;
  }
  closeModalRegistro(){
    this.isOpenRegistro = false;
  }

  openModalEliminar(){
    this.isOpenEliminar = true;
  }
  closeModalEliminar(){
    this.isOpenEliminar = false;
  }

}
