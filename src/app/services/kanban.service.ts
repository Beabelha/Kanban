import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../model/kanban';



@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  constructor(private http: HttpClient) { }

  listarTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(' https://crudcrud.com/api/6220eacd02734849a6b75873484b75e2/tarefa');
  }
  inserirTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(' https://crudcrud.com/api/6220eacd02734849a6b75873484b75e2/tarefa', tarefa);
  }

  atualizarTarefa(tarefa: Tarefa): Observable<any> {
    const id = tarefa._id;
    delete tarefa._id;
    return this.http.put(' https://crudcrud.com/api/6220eacd02734849a6b75873484b75e2/tarefa/' + id, tarefa);
  }

  removerTarefa(id: string): Observable<any> {
    return this.http.delete(' https://crudcrud.com/api/6220eacd02734849a6b75873484b75e2/tarefa/' + id);
  }
}
