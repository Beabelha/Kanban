import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/cliente';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  clientes: Array<Client>;
  colunas = ['nome', 'cpf', 'acoes'];
  clienteSelecionado: Client;
  inserindo = false;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.clientService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  remover(id: string) {
    this.clientService.removerCliente(id).subscribe(() => {
      alert('Tarefa removida');
      this.listar();
    });
  }

  selecionar(cliente: Client) {
    this.inserindo = false;
    this.clienteSelecionado = cliente;
  }
  cancelar() {
    this.clienteSelecionado = null;
  }
  salvar() {
    if (this.inserindo) {
      this.clientService.inserirCliente(this.clienteSelecionado).subscribe(()=> {
        alert('Cliente Salvo');
        this.listar();
      });
    } else {
      this.clientService.atualizarCliente(this.clienteSelecionado).subscribe(()=> {
        alert('Cliente Atualizado');
        this.listar();
      });
    }
  }

  newClient() {
    this.inserindo = true;
    this.clienteSelecionado = new Client();
  }

}
