import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule, 
    ModalComponent,
    FormsModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export default class ProductosComponent {
  productoDefault: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    stock: 0
  }
  producto: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    stock: 0
  }
  items: any[] = [];
  isOpenModalRegistro: boolean = false;
  isOpenModalEliminar: boolean = false;
  tituloModalRegistro: string = '';

  constructor(private apiService: ApiService, private Toast: ToastrService){}

  ngOnInit(): void{
    this.listarProductos()
  }

  limpiarProducto(){
    this.producto = {...this.productoDefault}
  }


  openModalRegistro(titulo: string, producto?: Producto){
    this.tituloModalRegistro = titulo;
    this.isOpenModalRegistro = true;
    this.limpiarProducto();

    console.log("producto -> ",producto)

    if(producto) this.producto = {...producto}
  }
  closeModalRegistro(){
    this.isOpenModalRegistro = false;
  }

  openModalEliminar(data: Producto){
    this.producto = data
    this.isOpenModalEliminar = true;
  }
  closeModalEliminar(){
    this.isOpenModalEliminar = false;
  }

  listarProductos(){
    this.apiService.getProductos().subscribe(
      (data) => this.items = data,
      (error) => console.log("error al listar item -> ",error)
    )
  }

  registrarProducto(){
    if(this.producto.id != 0){
      this.apiService.updateProducto(this.producto).subscribe(
        (response) => {
          this.listarProductos();
          this.Toast.success('Actualizado correctamente');
          this.closeModalRegistro();
        },
        (error) => {
          this.Toast.error('Ocurrio un error');
        }
      )
    }else{
      this.apiService.createProducto(this.producto).subscribe(
        (response) => {
          console.log("item creado -> ",response);
          this.listarProductos();
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

  eliminarProductos(){
    this.apiService.deleteProducto(this.producto).subscribe(
      (data) => {
        this.Toast.success("Eliminado correctamente")
        this.closeModalEliminar()
        this.listarProductos()
      },
      (error) => {
        this.Toast.error(error)
      }
    )
  }
}

interface Producto{
  id: number;
  nombre: string;
  precio: number;
  stock: number
}
