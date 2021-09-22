import { Injectable } from '@angular/core';
import { Cliente } from './cliente.inserir.interface';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Observable: (Subject): Sofre eventos
// Observer: Deseja ficar sabendo dos eventos
// Design Pattern: Obeserver
interface IClientesListResponseAPI {
  clientes: Cliente[];
}

@Injectable({
  providedIn: 'root',
})
class ClienteService {
  constructor(private httpClient: HttpClient) {}

  private listaClientesAtualizada = new Subject<Cliente[]>();
  private clientes: Cliente[] = [];

  getClientes() {
    this.httpClient
      .get<IClientesListResponseAPI>('http://localhost:3333/api/clientes')
      .subscribe((data) => {
        this.clientes = data.clientes;
        this.listaClientesAtualizada.next([...this.clientes]);
      });
    // return [...this.clientes]; // return this.clientes;
  }

  adicionarCliente(nome: string, telefone: string, email: string) {
    const cliente: Cliente = {
      email,
      nome,
      telefone,
    };

    this.httpClient
      .post<any>('http://localhost:3333/api/clientes', cliente)
      .subscribe((data) => {
        this.clientes.push(cliente);
        // Faz o envio de um evento
        this.listaClientesAtualizada.next([...this.clientes]);
      });
  }

  getListaDeClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable();
  }

  atualizarCliente(cliente: Cliente) {
    const clienteIndex = this.clientes.findIndex(
      (findCliente) => findCliente.email === cliente.email
    );

    this.clientes[clienteIndex] = cliente;
  }

  removerCliente(cliente: Cliente) {
    const clienteIndex = this.clientes.findIndex(
      (findCliente) => findCliente.email === cliente.email
    );

    this.clientes.splice(clienteIndex, 1);
  }
}

export { ClienteService };
