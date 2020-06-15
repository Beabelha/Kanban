import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/model/kanban';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-do',
  templateUrl: './do.component.html',
  styleUrls: ['./do.component.css']
})
export class DoComponent implements OnInit {

  tarefas: Array<Tarefa>;
  colunas = ['nome', 'desc', 'prazo', 'status', 'tag', 'acoes'];
  status = 'fazer';
  tarefaSelecionada: Tarefa;
  inserindo = false;

  constructor(private kanbanService: KanbanService) { }

  ngOnInit(): void {
    // this.listar();
  }


  listar() {
      this.kanbanService.listarTarefas().subscribe(tarefas => {
      this.tarefas = tarefas;
    });
  }

  listarFazer() {
    if (this.status === 'fazer') {
      this.kanbanService.listarTarefas().subscribe(tarefas => {
      this.tarefas = tarefas;
      });
    }
}

  listarFazendo() {
    if (this.status === 'fazendo') {
      this.kanbanService.listarTarefas().subscribe(tarefas => {
      this.tarefas = tarefas;
      });
    }
}

  listarFeito() {
    if (this.status === 'feito') {
      this.kanbanService.listarTarefas().subscribe(tarefas => {
      this.tarefas = tarefas;
      });
    }
}



  remover(id: string) {
    this.kanbanService.removerTarefa(id).subscribe(() => {
      alert('Tarefa removida');
      this.listar();
    });
  }

  selecionar(tarefa: Tarefa) {
    this.inserindo = false;
    this.tarefaSelecionada = tarefa;
  }
  cancelar() {
    this.tarefaSelecionada = null;
  }
  salvar() {
    if (this.inserindo) {
      this.kanbanService.inserirTarefa(this.tarefaSelecionada).subscribe(() => {
        alert('Tarefa Salva');
        this.listar();
      });
    } else {
      this.kanbanService.atualizarTarefa(this.tarefaSelecionada).subscribe(() => {
        alert('Tarefa Atualizada');
        this.listar();
      });
    }
  }

  newTarefa() {
    this.inserindo = true;
    this.tarefaSelecionada = new Tarefa();
  }
}
