import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<Client[]> {
    return this.http.get<Client[]>(' https://crudcrud.com/api/6d13e2a44bed441d9807462733bdcbba/client');
  }

  inserirCliente(client: Client): Observable<Client> {
    return this.http.post<Client>(' https://crudcrud.com/api/6d13e2a44bed441d9807462733bdcbba/client', client);
  }

  atualizarCliente(client: Client): Observable<any> {
    const id = client._id;
    delete client._id;
    return this.http.put(' https://crudcrud.com/api/6d13e2a44bed441d9807462733bdcbba/client/' + id, client)
  }

  removerCliente(id: string): Observable<any> {
    return this.http.delete(' https://crudcrud.com/api/6d13e2a44bed441d9807462733bdcbba/client/' + id);
  }

}

