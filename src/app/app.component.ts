import { Component, Input } from '@angular/core';
import { Cliente } from './clientes/cliente.inserir.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  clientes: Cliente[] = [];

  onClienteAdicionado(cliente: Cliente) {
    this.clientes = [...this.clientes, cliente];
  }
}
