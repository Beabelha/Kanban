import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/model/kanban';
import { KanbanService } from 'src/app/services/kanban.service';

interface Tags {
  _id: string;
  nomeTag: string;
}

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  tarefas: Array<Tarefa>;
  colunas = ['nome', 'desc', 'prazo', 'status', 'tag', 'acoes'];
  tarefaSelecionada: Tarefa;
  inserindo = false;
  tags: Tags[];


  constructor(private kanbanService: KanbanService) { }

  ngOnInit(): void {
    this.listarFeito();
    this.listarTag();
  }

  listarTag() {
    this.kanbanService.listarTarefas().subscribe(tarefas => {
      this.tags = tarefas;
      const tags = tarefas.filter(tarefa => tarefa.nomeTag !== '');
      this.tags = tags;
     });
}

  listarFeito() {
    this.kanbanService.listarTarefas().subscribe(tarefas => {
    this.tarefas = tarefas;
    const tarefasFeitas = tarefas.filter(tarefa => tarefa.status === 'feito');
    return this.tarefas = tarefasFeitas;
      });
  }

  remover(id: string) {
    this.kanbanService.removerTarefa(id).subscribe(() => {
      alert('Tarefa removida');
      this.listarFeito();
    });
  }

  selecionar(tarefa: Tarefa) {
    this.inserindo = false;
    this.tarefaSelecionada = tarefa;
  }

  cancelar() {
    this.tarefaSelecionada = null;
    this.listarFeito();
  }

  salvar() {
    if (this.inserindo) {
      this.kanbanService.inserirTarefa(this.tarefaSelecionada).subscribe(() => {
        alert('Tarefa Salva');
        this.listarFeito();
      });
    } else {
      this.kanbanService.atualizarTarefa(this.tarefaSelecionada).subscribe(() => {
        alert('Tarefa Atualizada');
        this.listarFeito();
      });
    }
  }

  newTarefa() {
    this.inserindo = true;
    this.tarefaSelecionada = new Tarefa();
  }

}
