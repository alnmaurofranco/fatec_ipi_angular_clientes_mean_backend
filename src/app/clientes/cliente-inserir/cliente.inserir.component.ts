import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../cliente.inserir.interface';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-inserir',
  styleUrls: ['./cliente.inserir.component.css'],
  templateUrl: './cliente.inserir.component.html',
})
export class ClienteInserirComponent implements OnInit {
  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {}

  onAdicionarCliente(form: NgForm) {
    if (form.invalid) return;

    this.clienteService.adicionarCliente(
      form.value.nome,
      form.value.telefone,
      form.value.email
    );

    form.resetForm();
  }
}
