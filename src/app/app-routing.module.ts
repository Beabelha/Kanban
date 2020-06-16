import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { ClientComponent } from './views/client/client.component';
import { ToDoComponent } from './views/to-do/to-do.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'client', component: ClientComponent },
  { path: 'to-do', component: ClientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
