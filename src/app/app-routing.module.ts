import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {QuestionComponent} from "./pages/question/question.component";

const routes: Routes = [
  {
    path: 'home',
    title: 'Accueil',
    component: HomeComponent
  },
  {
    path: 'question',
    title: 'Question',
    component: QuestionComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
