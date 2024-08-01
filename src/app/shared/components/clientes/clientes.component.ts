import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export default class ClientesComponent {
  items = Array(100).fill(null);
}
