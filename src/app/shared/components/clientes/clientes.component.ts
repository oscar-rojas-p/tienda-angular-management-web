import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    FormsModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export default class ClientesComponent {
  cliente: Cliente = {
    id: 0,
    nombre: '',
    telefono: '',
    email: ''
  }
  items: any[] = [];
  isOpenRegistro: boolean = false;
  isOpenEliminar: boolean = false;
  tituloModalRegistro: string = '';

  constructor(private apiService: ApiService,private Toast: ToastrService){}

  ngOnInit(): void {
    this.listarClientes()
  }

  openModalRegistro(titulo: string, cliente? : Cliente){
    this.isOpenRegistro = true;
    this.tituloModalRegistro = titulo;
    this.limpiarDatos()

    if(cliente) this.cliente = {...cliente}
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

  listarClientes(){
    this.apiService.getClientes().subscribe(
      (data) => this.items = data,
      (error) => console.log("error al listar item -> ", error)
    )
  }

  registrarClientes(){
    if(this.cliente.id != 0){
      this.apiService.updateCliente(this.cliente).subscribe(
        (response) => {
          this.listarClientes();
          this.Toast.success('Actualizado correctamente');
          this.closeModalRegistro();
        },
        (error) => {
          this.Toast.error('Ocurrio un error');
        }
      )
    }else{
      this.apiService.createCliente(this.cliente).subscribe(
        (response) => {
          console.log("item creado -> ",response);
          this.listarClientes();
          this.Toast.success('Registrado correctamente');
          this.closeModalRegistro();
        },
        (error) => {
          console.log("error al crear item -> ", error)
          this.Toast.error('Ocurrio un error');
        }
      )
    }
  }


  limpiarDatos() {
    this.cliente = {
      id: 0,
      nombre: '',
      telefono: '',
      email: ''
    }
  }


}

interface Cliente{
  id: number;
  nombre: string;
  telefono: string;
  email: string;
}
