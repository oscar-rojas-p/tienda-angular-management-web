import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export default class PedidosComponent {
  items = Array(100).fill(null);
}
