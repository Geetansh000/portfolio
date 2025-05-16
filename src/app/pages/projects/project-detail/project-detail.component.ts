import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRoutesService } from '../../../shared/api-routes.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, NgFor],
})
export class ProjectDetailComponent implements OnInit {
  constructor(
    private projectService: ApiRoutesService,
    private route: ActivatedRoute
  ) {}

  project: any = {};
  showIcons = true;
  techCategories: string[] = [];
  slug: string = '';

  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe({
      next: (param) => {
        const slug = param.get('id');
        if (slug) {
          this.slug = slug;
          this.getProjectDetails(slug);
        } else {
          console.error('Slug not found in route');
        }
      },
    });
  }

  getProjectDetails(slug: string) {
    this.projectService.getProjectDetails(slug).subscribe({
      next: (data) => {
        this.project = data;
        this.techCategories = Object.keys(this.project?.tech_skills || {});
      },
      error: (err) => {
        console.error('Failed to load project', err);
      },
    });
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
      MySQL: 'assets/icons/MySQL.png',
      Docker: 'assets/icons/Docker.png',
      'Event-Driven Architecture': 'assets/icons/event-driven.png',
      NestJS: 'assets/icons/Nestjs.png',
      TypeORM: 'assets/icons/typeorm.png',
      React: 'assets/icons/React.png',
    };
    return iconMap[tech] || null;
  }
}
