import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/model/kanban';
import { KanbanService } from 'src/app/services/kanban.service';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from 'src/app/model/tag';

@Component({
  selector: 'app-doing',
  templateUrl: './doing.component.html',
  styleUrls: ['./doing.component.css']
})
export class DoingComponent implements OnInit {
  tags: Array<Tag>;
  tarefas: Array<Tarefa>;
  colunas = ['nome', 'desc', 'prazo', 'status', 'tag', 'acoes'];
  tarefaSelecionada: Tarefa;
  inserindo = false;


  constructor(private kanbanService: KanbanService, private tagService: TagsService) { }

  ngOnInit(): void {
    this.listarFazendo();
    this.atualizarTag();
  }

atualizarTag() {
    this.tags = this.tagService.listarTag();
}

listarFazendo() {
  this.kanbanService.listarTarefas().subscribe(tarefas => {
  this.tarefas = tarefas;
  const tarefasFazendo = tarefas.filter(tarefa => tarefa.status === 'fazendo');
  return this.tarefas = tarefasFazendo;
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
