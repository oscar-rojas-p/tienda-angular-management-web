import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import ClientesComponent from '../clientes/clientes.component';
import PedidosComponent from '../pedidos/pedidos.component';
import ProductosComponent from '../productos/productos.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [
		ClientesComponent,
		PedidosComponent,
		ProductosComponent,
		RouterOutlet,
		RouterLink,
		RouterLinkActive
	],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.css'
})
export default class LayoutComponent {
	
}
