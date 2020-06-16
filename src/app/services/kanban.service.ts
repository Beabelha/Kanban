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
    return this.http.get<Tarefa[]>(' https://crudcrud.com/api/dc6c6b9a3a664bde9543f5e96c91b394/tarefa');
  }
  inserirTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(' https://crudcrud.com/api/dc6c6b9a3a664bde9543f5e96c91b394/tarefa', tarefa);
  }

  atualizarTarefa(tarefa: Tarefa): Observable<any> {
    const id = tarefa._id;
    delete tarefa._id;
    return this.http.put(' https://crudcrud.com/api/dc6c6b9a3a664bde9543f5e96c91b394/tarefa/' + id, tarefa);
  }

  removerTarefa(id: string): Observable<any> {
    return this.http.delete(' https://crudcrud.com/api/dc6c6b9a3a664bde9543f5e96c91b394/tarefa/' + id);
  }
}
