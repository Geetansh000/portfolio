import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  imports: [CommonModule, NgFor],
})
export class ProjectDetailComponent implements OnInit {
  @ViewChild('title', { static: false }) title!: ElementRef;
  @ViewChild('description', { static: false }) description!: ElementRef;
  @ViewChild('techCards', { static: false }) techCards!: ElementRef;

  project: { title: string, description: string[], role: string, techSkills: { [key: string]: string[] }} = {
    title: 'Sample Project',
    description: [
      'This is a sample project</strong> showcasing the project details.',
      'It uses various <strong>technologies</strong> and demonstrates best practices.',
    ],
    role: 'Full Stack Developer',

    techSkills: {
      db: ['MySQL'],
      others: ['Docker', 'Event-Driven Architecture'],
      backend: ['NestJS', 'TypeORM'],
      frontend: ['React'],
    },
  };
  showIcons = true;

  techCategories: string[] = [];

  ngOnInit(): void {
    this.techCategories = Object.keys(this.project.techSkills);
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
