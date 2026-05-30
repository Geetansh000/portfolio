import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRoutesService } from '../../../shared/api-routes.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { LoaderDialogComponent } from '../../../shared/loader-dialog/loader-dialog.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
  standalone: true,
  imports: [CommonModule, NgFor],
})
export class ProjectDetailComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private projectService: ApiRoutesService,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
    private readonly cdr: ChangeDetectorRef
  ) {}

  project: any = null;
  showIcons = true;
  techCategories: string[] = [];
  slug: string = '';
  display = false;
  private pendingTimeouts: number[] = [];

  ngOnInit(): void {
    const dialogRef = this.dialog.open(LoaderDialogComponent);

    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (param) => {
        const slug = param.get('id');
        if (slug) {
          this.slug = slug;
          this.getProjectDetails(slug);
          const closeTimeout = window.setTimeout(() => {
            dialogRef.close();
          }, 300);
          this.pendingTimeouts.push(closeTimeout);
        } else {
          console.error('Slug not found in route');
        }
      },
    });
  }

  getProjectDetails(slug: string) {
    this.projectService.getProjectDetails(slug).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.project = data;
        this.techCategories = Object.keys(this.project?.tech_skills || {});
        this.display = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load project', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.pendingTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    this.pendingTimeouts = [];
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none'; // hide if image fails to load
  }
  formatCategoryName(category: string): string {
    const map: Record<string, string> = {
      db: 'Databases',
      backend: 'Backend',
      frontend: 'Frontend',
      others: 'Others',
    };
    return (
      map[category] || category.charAt(0).toUpperCase() + category.slice(1)
    );
  }

  getIconForTech(tech: string): string | null {
    const iconMap: Record<string, string> = {
      Angular: 'assets/icons/Angular.png',
      Bootstrap: 'assets/icons/Bootstrap.png',
      CSS: 'assets/icons/CSS3.png',
      Docker: 'assets/icons/Docker.png',
      HTML: 'assets/icons/HTML5.png',
      Jupyter: 'assets/icons/Jupyter.png',
      Kaggle: 'assets/icons/Kaggle.png',
      Laravel: 'assets/icons/Laravel.png',
      Linux: 'assets/icons/Linux.png',
      Matplotlib: 'assets/icons/Matplotlib.png',
      MongoDB: 'assets/icons/MongoDB.png',
      Moongoose: 'assets/icons/Mongoose.js.png',
      MySQL: 'assets/icons/MySQL.png',
      NestJS: 'assets/icons/Nest.js.png',
      NodeJS: 'assets/icons/Node.js.png',
      OpenCV: 'assets/icons/OpenCV.png',
      PHP: 'assets/icons/PHP.png',
      PostgresSQL: 'assets/icons/PostgresSQL.png',
      Python: 'assets/icons/Python.png',
      React: 'assets/icons/React.png',
      Swagger: 'assets/icons/Swagger.png',
      'Tailwind CSS': 'assets/icons/Tailwind CSS.png',
      Tensorflow: 'assets/icons/Tensorflow.png',
      TypeScript: 'assets/icons/TypeScript.png',
    };
    return iconMap[tech] || null;
  }
}
