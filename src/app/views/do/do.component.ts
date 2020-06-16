import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/model/kanban';
import { KanbanService } from 'src/app/services/kanban.service';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from 'src/app/model/tag';


@Component({
  selector: 'app-do',
  templateUrl: './do.component.html',
  styleUrls: ['./do.component.css']
})

export class DoComponent implements OnInit {
  tarefas: Array<Tarefa>;
  tags: Array<Tag>;
  colunas = ['nome', 'desc', 'prazo', 'tag', 'acoes'];
  tarefaSelecionada: Tarefa;
  inserindo = false;
  // tags: Tags[];
  input = false;

  constructor(private kanbanService: KanbanService, private tagService: TagsService) { }

  ngOnInit(): void {
    this.listarFazer();
    this.atualizarTag();
    // this.listarTag();
  }


atualizarTag() {
    this.tags = this.tagService.listarTag();
}

// listarTag() {
//       this.kanbanService.listarTarefas().subscribe(tarefas => {
//         this.tags = tarefas;
//         const tags = tarefas.filter(tarefa => tarefa.nomeTag !== '');
//         this.tags = tags;
//           });
// }

  listarFazer() {
    this.kanbanService.listarTarefas().subscribe(tarefas => {
    this.tarefas = tarefas;
    const tarefasPraFazer = tarefas.filter(tarefa => tarefa.status === 'fazer');
    return this.tarefas = tarefasPraFazer;
      });
}

  remover(id: string) {
    this.kanbanService.removerTarefa(id).subscribe(() => {
      alert('Tarefa removida');
      this.listarFazer();
    });
  }

  selecionar(tarefa: Tarefa) {
    this.inserindo = false;
    this.tarefaSelecionada = tarefa;
    this.input = true;

  }
    cancelar() {
    this.tarefaSelecionada = null;
    this.listarFazer();
  }
  salvar() {
    if (this.inserindo) {
      this.kanbanService.inserirTarefa(this.tarefaSelecionada).subscribe(() => {
          alert('Tarefa Salva');
          this.listarFazer();
      });
    } else {
      this.kanbanService.atualizarTarefa(this.tarefaSelecionada).subscribe(() => {
        alert('Tarefa Atualizada');
        this.listarFazer();
      });
    }
  }

  newTarefa() {
    this.inserindo = true;
    this.input = false;
    this.tarefaSelecionada = new Tarefa();
  }
}
