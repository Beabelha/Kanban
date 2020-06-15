import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { DoComponent } from './views/do/do.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'do', component: DoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
