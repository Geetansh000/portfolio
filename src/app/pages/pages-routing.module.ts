import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectRoutingModule } from './projects/project-routing.module';

const routes: Routes = [
  // { path: 'projects', component: ProjectRoutingModule }, // Home Page as default route
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
