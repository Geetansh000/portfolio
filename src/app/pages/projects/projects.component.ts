import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
    this.startAutoSlide(); // 🚀 Start auto-slide here
    // setTimeout(() => dialogRef.close(), 3000); // fallback close
  }
  @ViewChild('projectSlider', { static: false }) slider!: ElementRef;
  private autoSlideInterval: any;

  ngAfterViewInit() {
    setTimeout(() => this.scrollToActive(), 0);
  }

  scrollLeft() {
    const last = this.projects.pop();
    if (last) {
      this.projects.unshift(last);
      this.scrollToActive();
    }
  }

  scrollRight() {
    const first = this.projects.shift();
    if (first) {
      this.projects.push(first);
      this.scrollToActive();
    }
  }

  scrollToActive() {
    const container = this.slider.nativeElement as HTMLElement;
    const activeCard = container.querySelector(
      '.project-card.active'
    ) as HTMLElement;

    if (activeCard) {
      activeCard.classList.add('entering');
      setTimeout(() => activeCard.classList.remove('entering'), 600); // cleanup after animation

      const containerCenter = container.offsetWidth / 2;
      const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
      container.scrollTo({
        left: cardCenter - containerCenter,
        behavior: 'smooth',
      });
    }
  }

  getActiveIndex(): number {
    return Math.floor(this.projects.length / 2);
  }
  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval); // 🧹 Clean up on destroy
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.scrollRight(); // 👉 Move to the next project
    }, 3000); // 3 seconds
  }

  viewProjectDetails(project: any): void {
    this.selectedProject = project;
    this.router.navigate(['/projects/detail', project.slug]);
  }
}
