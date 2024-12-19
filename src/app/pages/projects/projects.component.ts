import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

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
  projects = [
    {
      title: 'Loan Management System',
      tech_skills: {
        frontend: ['React'],
        backend: ['NestJS', 'TypeORM'],
        db: ['MySQL'],
        others: ['Docker', 'Event-Driven Architecture'],
      },
      type: 'personal',
      description: [
        'Developed a robust loan management system to streamline loan application and processing.',
        'Integrated third-party adapters for customer onboarding, document verification, and risk profiling.',
        'Implemented audit logging to ensure transparency and regulatory compliance.',
        'Utilized Docker for seamless deployment and consistent development environments.',
      ],
      role: 'Backend Developer',
      special_words: [
        'NestJS',
        'MySQL',
        'Event-Driven Architecture',
        'Docker',
        'audit logging',
      ],
    },{
      title: 'Loan Management System',
      tech_skills: {
        frontend: ['React'],
        backend: ['NestJS', 'TypeORM'],
        db: ['MySQL'],
        others: ['Docker', 'Event-Driven Architecture'],
      },
      type: 'personal',
      description: [
        'Developed a robust loan management system to streamline loan application and processing.',
        'Integrated third-party adapters for customer onboarding, document verification, and risk profiling.',
        'Implemented audit logging to ensure transparency and regulatory compliance.',
        'Utilized Docker for seamless deployment and consistent development environments.',
      ],
      role: 'Backend Developer',
      special_words: [
        'NestJS',
        'MySQL',
        'Event-Driven Architecture',
        'Docker',
        'audit logging',
      ],
    },{
      title: 'Loan Management System',
      tech_skills: {
        frontend: ['React'],
        backend: ['NestJS', 'TypeORM'],
        db: ['MySQL'],
        others: ['Docker', 'Event-Driven Architecture'],
      },
      type: 'personal',
      description: [
        'Developed a robust loan management system to streamline loan application and processing.',
        'Integrated third-party adapters for customer onboarding, document verification, and risk profiling.',
        'Implemented audit logging to ensure transparency and regulatory compliance.',
        'Utilized Docker for seamless deployment and consistent development environments.',
      ],
      role: 'Backend Developer',
      special_words: [
        'NestJS',
        'MySQL',
        'Event-Driven Architecture',
        'Docker',
        'audit logging',
      ],
    },{
      title: 'Loan Management System',
      tech_skills: {
        frontend: ['React'],
        backend: ['NestJS', 'TypeORM'],
        db: ['MySQL'],
        others: ['Docker', 'Event-Driven Architecture'],
      },
      type: 'personal',
      description: [
        'Developed a robust loan management system to streamline loan application and processing.',
        'Integrated third-party adapters for customer onboarding, document verification, and risk profiling.',
        'Implemented audit logging to ensure transparency and regulatory compliance.',
        'Utilized Docker for seamless deployment and consistent development environments.',
      ],
      role: 'Backend Developer',
      special_words: [
        'NestJS',
        'MySQL',
        'Event-Driven Architecture',
        'Docker',
        'audit logging',
      ],
    },
    {
      title: 'Catering Management System',
      tech_skills: {
        frontend: [],
        backend: ['Node.js', 'Express'],
        db: ['MongoDB'],
        others: [
          'Paymennt Payment Gateway',
          'Dynamic Buffet System',
          'QR-based Reports',
        ],
      },
      type: 'industry',
      description: [
        'Built REST APIs with the Express framework to support catering services.',
        'Integrated the Paymennt payment gateway for secure online transactions.',
        'Designed a dynamic system allowing users to customize buffet packages or choose predefined options.',
        'Created QR-based reports for kitchen staff, sales, and order summaries.',
      ],
      role: 'Full-Stack Developer',
      special_words: [
        'Node.js',
        'Express',
        'MongoDB',
        'Paymennt Payment Gateway',
        'QR-based Reports',
      ],
    },
  ];

  selectedProject: any = null;
  industryProjects = this.projects.filter((p) => p.type === 'industry');
  personalProjects = this.projects.filter((p) => p.type === 'personal');
  constructor(private dialog: MatDialog) {}

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
    // this.dialog.open(ProjectDetailsDialogComponent, {
    //   data: project,
    //   width: '600px',
    // });
  }
}
