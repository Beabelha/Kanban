import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/model/kanban';
import { KanbanService } from 'src/app/services/kanban.service';


@Component({
  selector: 'app-doing',
  templateUrl: './doing.component.html',
  styleUrls: ['./doing.component.css']
})
export class DoingComponent implements OnInit {

  tarefas: Array<Tarefa>;
  colunas = ['nome', 'desc', 'prazo', 'status', 'tag', 'acoes'];
  tarefaSelecionada: Tarefa;
  inserindo = false;

  constructor(private kanbanService: KanbanService) { }

  ngOnInit(): void {
    this.listarFazendo();
  }

listarFazendo() {
  this.kanbanService.listarTarefas().subscribe(tarefas => {
  this.tarefas = tarefas;
  const tarefasPraFazer = tarefas.filter(tarefa => tarefa.status === 'fazendo');
  return this.tarefas = tarefasPraFazer;
    });
}

remover(id: string) {
  this.kanbanService.removerTarefa(id).subscribe(() => {
    alert('Tarefa removida');
    this.listarFazendo();
  });
}

selecionar(tarefa: Tarefa) {
  this.inserindo = false;
  this.tarefaSelecionada = tarefa;
}

cancelar() {
  this.tarefaSelecionada = null;
  this.listarFazendo();
}

salvar() {
  if (this.inserindo) {
    this.kanbanService.inserirTarefa(this.tarefaSelecionada).subscribe(() => {
      alert('Tarefa Salva');
      this.listarFazendo();
    });
  } else {
    this.kanbanService.atualizarTarefa(this.tarefaSelecionada).subscribe(() => {
      alert('Tarefa Atualizada');
      this.listarFazendo();
    });
  }
}

newTarefa() {
  this.inserindo = true;
  this.tarefaSelecionada = new Tarefa();
}

}
