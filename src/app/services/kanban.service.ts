import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Tarefa } from '../model/kanban';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  constructor(private http: HttpClient) { }

  listarTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(' https://crudcrud.com/api/afd2bcc06fc646c5a80bd19fbcba240c/tarefa');
  }

  inserirTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(' https://crudcrud.com/api/afd2bcc06fc646c5a80bd19fbcba240c/tarefa', tarefa);
  }

  atualizarTarefa(tarefa: Tarefa): Observable<any> {
    const id = tarefa._id;
    delete tarefa._id;
    return this.http.put(' https://crudcrud.com/api/afd2bcc06fc646c5a80bd19fbcba240c/tarefa/' + id, tarefa);
  }

  removerTarefa(id: string): Observable<any> {
    return this.http.delete(' https://crudcrud.com/afd2bcc06fc646c5a80bd19fbcba240c/tarefa/' + id);
  }
}
