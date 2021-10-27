import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cliente } from '../cliente.inserir.interface';
import { ClienteService } from '../cliente.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];

  private clienteSubscription: Subscription;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes();

    this.clienteSubscription = this.clienteService
      .getListaDeClientesAtualizadaObservable()
      .subscribe((clientes: Cliente[]) => {
        this.clientes = clientes;
      });
  }

  ngOnDestroy(): void {
    this.clienteSubscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.clienteService.removerCliente(id);
  }
}
