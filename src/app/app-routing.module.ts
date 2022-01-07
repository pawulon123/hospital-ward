import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseWindowComponent } from './current-state/base-window/base-window.component';

const routes: Routes = [
  { path: 'current-stay', component: <any>BaseWindowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
