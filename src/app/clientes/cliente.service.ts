import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from './cliente.inserir.interface';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

// Observable: (Subject): Sofre eventos
// Observer: Deseja ficar sabendo dos eventos
// Design Pattern: Obeserver

interface IClientesListResponseAPI {
  clientes: any;
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
      .pipe(
        map((data) => {
          return data.clientes.map((cliente) => {
            return {
              id: cliente._id,
              nome: cliente.nome,
              telefone: cliente.telefone,
              email: cliente.email,
            };
          });
        })
      )
      .subscribe((clientes) => {
        this.clientes = clientes;
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
        this.clientes.push({
          id: data.id,
          ...cliente,
        });

        // Faz o envio de um evento com a lista atualizada
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

  removerCliente(id: string): void {
    this.httpClient
      .delete(`http://localhost:3333/api/clientes/${id}`)
      .subscribe(() => {
        this.clientes = this.clientes.filter(
          (findCliente) => findCliente.id !== id
        );

        this.listaClientesAtualizada.next([...this.clientes]);
      });
  }
}

export { ClienteService };
