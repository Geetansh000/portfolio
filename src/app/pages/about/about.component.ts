import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { RoadmapComponent } from './roadmap/roadmap.component';

interface SkillItem {
  name: string;
  icon: string;
  track: string;
}

interface SkillGroup {
  category: string;
  skills: SkillItem[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [MatCardModule, CommonModule, RoadmapComponent, SharedModule],
  standalone: true,
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('skillsSection') skillsSectionRef!: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;

  // Origin directions for each card (from different sides of screen)
  private readonly cardOrigins = [
    { tx: '-160px', ty: '-120px', rot: '-14deg' }, // top-left
    { tx: '0', ty: '-140px', rot: '-5deg' }, // top
    { tx: '160px', ty: '-120px', rot: '11deg' }, // top-right
    { tx: '180px', ty: '0', rot: '16deg' }, // right
    { tx: '160px', ty: '120px', rot: '-12deg' }, // bottom-right
    { tx: '0', ty: '140px', rot: '7deg' }, // bottom
    { tx: '-160px', ty: '120px', rot: '13deg' }, // bottom-left
    { tx: '-180px', ty: '0', rot: '-15deg' }, // left
  ];

  private cardIndex = 0;

  getCardVars(i: number): Record<string, string | number> {
    const o = this.cardOrigins[i % this.cardOrigins.length];
    return {
      '--tx': o.tx,
      '--ty': o.ty,
      '--rot': o.rot,
      '--i': this.cardIndex++,
    };
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = this.skillsSectionRef?.nativeElement;
          if (!section || section.classList.contains('skills-visible')) return;
          section.classList.add('skills-visible');
          this.observer?.disconnect();
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    if (this.skillsSectionRef?.nativeElement) {
      this.observer.observe(this.skillsSectionRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  skillGroups: SkillGroup[] = [
    {
      category: 'Languages',
      skills: [
        {
          name: 'JavaScript',
          icon: 'assets/icons/JavaScript.png',
          track: 'Language',
        },
        {
          name: 'TypeScript',
          icon: 'assets/icons/TypeScript.png',
          track: 'Language',
        },
        { name: 'Python', icon: 'assets/icons/Python.png', track: 'Language' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', icon: 'assets/icons/Node.js.png', track: 'Backend' },
        { name: 'NestJS', icon: 'assets/icons/Nest.js.png', track: 'Backend' },
        { name: 'Django', icon: 'assets/icons/Django.png', track: 'Backend' },
        { name: 'PHP', icon: 'assets/icons/PHP.png', track: 'Backend' },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { name: 'MySQL', icon: 'assets/icons/MySQL.png', track: 'Database' },
        {
          name: 'PostgreSQL',
          icon: 'assets/icons/PostgresSQL.png',
          track: 'Database',
        },
        {
          name: 'MongoDB',
          icon: 'assets/icons/MongoDB.png',
          track: 'Database',
        },
      ],
    },
    {
      category: 'ORMs & ODMs',
      skills: [
        { name: 'TypeORM', icon: 'assets/icons/TypeORM.png', track: 'ORM' },
        {
          name: 'Mongoose',
          icon: 'assets/icons/Mongoose.js.png',
          track: 'ORM',
        },
      ],
    },
    {
      category: 'ML & Data',
      skills: [
        {
          name: 'TensorFlow',
          icon: 'assets/icons/TensorFlow.png',
          track: 'ML',
        },
        { name: 'OpenCV', icon: 'assets/icons/OpenCV.png', track: 'ML' },
        { name: 'Pandas', icon: 'assets/icons/Pandas.png', track: 'ML' },
        { name: 'NumPy', icon: 'assets/icons/NumPy.png', track: 'ML' },
      ],
    },
    {
      category: 'Web & Styling',
      skills: [
        { name: 'HTML', icon: 'assets/icons/HTML5.png', track: 'Web' },
        { name: 'CSS', icon: 'assets/icons/CSS3.png', track: 'Web' },
        { name: 'SCSS', icon: 'assets/icons/SCSS.png', track: 'Web' },
      ],
    },
    {
      category: 'DevOps & Cloud',
      skills: [
        { name: 'Docker', icon: 'assets/icons/Docker.png', track: 'DevOps' },
        { name: 'Linux', icon: 'assets/icons/Linux.png', track: 'DevOps' },
        { name: 'AWS S3', icon: 'assets/icons/AWS_S3.png', track: 'Cloud' },
        { name: 'Git', icon: 'assets/icons/Github.png', track: 'DevOps' },
      ],
    },
    {
      category: 'Messaging & Testing',
      skills: [
        {
          name: 'Apache Kafka',
          icon: 'assets/icons/Apache_Kafka.png',
          track: 'Messaging',
        },
        {
          name: 'RabbitMQ',
          icon: 'assets/icons/RabbitMQ.png',
          track: 'Messaging',
        },
        { name: 'JMeter', icon: 'assets/icons/JMeter.png', track: 'Testing' },
      ],
    },
  ];

  journeyMetrics = [
    { value: '2+', label: 'Years Professional Exp.' },
    { value: '10+', label: 'Systems Built' },
    { value: 'Backend', label: 'Core Specialization' },
  ];
}
