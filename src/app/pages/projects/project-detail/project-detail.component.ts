import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

const angularIcon = '../';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  imports: [CommonModule],
})
export class ProjectDetailComponent implements AfterViewInit {
  @ViewChild('title', { static: false }) title!: ElementRef;
  @ViewChild('description', { static: false }) description!: ElementRef;
  @ViewChild('techCards', { static: false }) techCards!: ElementRef;

  project = {
    title: 'Sample Project',
    description: `
      This is a <strong>sample project</strong> showcasing the project details.
      It uses various <strong>technologies</strong> and demonstrates best practices.
    `,
    //""

    techSkills: [
      { name: 'Angular', icon: '../../../../../assets/icons/Angular.png' },
      { name: 'TypeScript', icon: 'assets/icons/Typescript.png' },
      { name: 'CSS', icon: 'assets/icons/CSS3.png' },
      { name: 'HTML', icon: 'assets/icons/html.png' },
    ],
  };

  ngAfterViewInit(): void {
    this.animatePage();
  }

  animatePage(): void {
    // Animate Title
    gsap.from(this.title.nativeElement, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out',
    });

    // Animate Description
    gsap.from(this.description.nativeElement, {
      opacity: 0,
      x: -50,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
    });

    // Animate Tech Cards
    const techCardElements =
      this.techCards.nativeElement.querySelectorAll('.tech-card');
    gsap.from(techCardElements, {
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      delay: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.75)',
    });
  }
}
