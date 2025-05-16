import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { ApiRoutesService } from '../../shared/api-routes.service';
import { LoaderDialogComponent } from '../../shared/loader-dialog/loader-dialog.component';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private readonly projectService: ApiRoutesService
  ) {}
  selectedProject: any;
  display = false;
  projects: any[] = [];
  ngOnInit(): void {
    const dialogRef = this.dialog.open(LoaderDialogComponent);
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        setTimeout(() => {
          dialogRef.close(), (this.display = true);
        }, 300); // smoother transition
      },
      error: (err) => {
        console.error('Failed to load projects', err);
      },
    });
    setTimeout(() => dialogRef.close(), 3000); // fallback close
  }
  openProjectModal(project: any): void {
    this.selectedProject = project;
  }

  closeModal(): void {
    this.selectedProject = null;
  }

  highlightSpecialWords(text: string, specialWords: string[]): string {
    specialWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      text = text.replace(regex, '<span class="special-word">$1</span>');
    });
    return text;
  }
  viewProjectDetails(project: any): void {
    this.selectedProject = project;
    this.router.navigate(['/projects/detail', project.slug]);
  }
}
