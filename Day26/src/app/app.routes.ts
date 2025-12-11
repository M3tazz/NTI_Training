import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { NotFound } from './not-found/not-found';
import { StudentListComponent } from './student-list-component/student-list-component';
import { CardBoxComponent } from './card-box-component/card-box-component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'cards', component: StudentListComponent },
  { path: 'ngcontent', component: CardBoxComponent },
  { path: '**', component: NotFound },
];
