import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../../../services/api.service';

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
  items: any[] = [];
  isOpenRegistro: boolean = false;
  isOpenEliminar: boolean = false;
  tituloModalRegistro: string = '';

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.listarClientes()
  }

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

  listarClientes(): void {
    this.apiService.getClientes().subscribe(
      (data) => this.items = data,
      (error) => console.log("error al listar item -> ", error)
    )
  }

  registrarClientes(itemData: any): void {
    this.apiService.createCliente(itemData).subscribe(
      (response) => {
        console.log("item creado -> ",response);
        this.listarClientes();
        this.closeModalRegistro();
      },
      (error) => {
        console.log("error al crear item -> ", error)
      }
    )
  }



}
