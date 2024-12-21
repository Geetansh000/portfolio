import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';

const routes: Routes = [
  { path: '/project-detail', component: ProjectDetailComponent }, // Home Page as default route
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
