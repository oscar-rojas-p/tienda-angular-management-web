import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';

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
  items: any[] = [];
  clienteModal: number = 0;
  productosModal: any[] = [];
  productoRegistroDefault: ProductoRegistro = {
    cantidad: 0,
    codProducto: 0,
    precio: 0
  }
  productoRegistro: ProductoRegistro = {...this.productoRegistroDefault}
  pedido: any
  
  isOpenModalRegistrarEditar: boolean = false;
  tituloModalRegistrarEditar: string = '';
  isOpenModalEliminar: boolean = false;

  productosSelect: any[] = [];
  clientesSelect: any[] = [];

  constructor(private Toast: ToastrService,private apiService: ApiService){}

  async ngOnInit(){
    this.clientesSelect = await this.apiService.getClientes().toPromise()
    this.productosSelect = await this.apiService.getProductos().toPromise()
    await this.listarPedidos()
  }
  
  openModalRegistrarEditar(titulo: string){
    this.tituloModalRegistrarEditar = titulo;
    this.isOpenModalRegistrarEditar = true;
  }

  async listarPedidos(){
    const pedidos = await this.apiService.getPedidos().toPromise()

    const valoresListados = pedidos.map((elem:any) => {
      const cliente = this.clientesSelect.find(e => e.id == elem.codCliente)
      const precioTotal = 
      elem.productos.reduce((acum: number,e:any) => 
        acum + this.productosSelect.find(elemento => elemento.id == e.codProducto).precio
      ,0)
      console.log("precioTotal -> ",precioTotal)
      const productos = 
      elem.productos.map((e:any) => 
        this.productosSelect.find(elemento => elemento.id == e.codProducto).nombre
      ).join(',')

      return {
        id: elem.id,
        codCliente: cliente.id,
        cliente: cliente.nombre,
        productos: productos,
        precioTotal: precioTotal
      }
    })

    this.items = valoresListados
  }

  registrarPedido(){
    const arrRegistro = {
      codCliente: this.clienteModal,
      productos: this.productosModal
    }

    if(arrRegistro.codCliente == 0){
      this.Toast.info("Seleccionar un cliente valido")
      return
    }
    if(arrRegistro.productos.length == 0){
      this.Toast.info("Elegir al menos un producto")
      return
    }

    this.apiService.createPedido(arrRegistro).subscribe(
      (response) => {
        this.listarPedidos()
        this.Toast.success('Registrado correctamente');
        this.closeModalRegistrarEditar()
      },
      (error) => {
        this.Toast.error('Ocurrio un error');
      }
    )
  }

  eliminarPedido(){
    this.apiService.deletePedido(this.pedido).subscribe(
      (data) => {
        this.Toast.success("Eliminado correctamente")
        this.closeModalEliminar()
        this.listarPedidos()
      },
      (error) => {
        this.Toast.error(error)
      }
    )
  }
  
  closeModalRegistrarEditar(){
    this.isOpenModalRegistrarEditar = false;
  }

  openModalEliminar(data: any){
    console.log("data -> ",data)
    this.pedido = data
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

  calcularProductoPrecio(){
    this.productoRegistro.precio = this.productoRegistro.cantidad * this.productosSelect.find(e => e.id === Number(this.productoRegistro.codProducto)).precio
  }

  obtenerNombreProducto(codigoProducto: number): string{
    return this.productosSelect.find(e => e.id == codigoProducto).nombre
  }

}

interface ProductoRegistro{
  codProducto: number;
  cantidad: number;
  precio: number
}
