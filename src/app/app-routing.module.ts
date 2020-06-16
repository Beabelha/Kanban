import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { DoComponent } from './views/do/do.component';
import { DoingComponent } from './views/doing/doing.component';
import { DoneComponent } from './views/done/done.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'do', component: DoComponent },
  { path: 'doing', component: DoingComponent },
  { path: 'done', component: DoneComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
