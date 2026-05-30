import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { RoadmapComponent } from './roadmap/roadmap.component';

interface SkillItem {
  name: string;
  icon: string;
  track: string;
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
    { tx: '0',      ty: '-140px', rot: '-5deg'  }, // top
    { tx: '160px',  ty: '-120px', rot:  '11deg' }, // top-right
    { tx: '180px',  ty: '0',      rot:  '16deg' }, // right
    { tx: '160px',  ty: '120px',  rot: '-12deg' }, // bottom-right
    { tx: '0',      ty: '140px',  rot:   '7deg' }, // bottom
    { tx: '-160px', ty: '120px',  rot:  '13deg' }, // bottom-left
    { tx: '-180px', ty: '0',      rot: '-15deg' }, // left
  ];

  getCardVars(i: number): Record<string, string | number> {
    const o = this.cardOrigins[i % this.cardOrigins.length];
    return {
      '--tx':  o.tx,
      '--ty':  o.ty,
      '--rot': o.rot,
      '--i':   i,
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
      }
    );

    if (this.skillsSectionRef?.nativeElement) {
      this.observer.observe(this.skillsSectionRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  coreSkills: SkillItem[] = [
    { name: 'Node.js',     icon: 'assets/icons/Node.js.png',      track: 'Backend'   },
    { name: 'NestJS',     icon: 'assets/icons/Nest.js.png',      track: 'Backend'   },
    { name: 'TypeScript', icon: 'assets/icons/TypeScript.png',   track: 'Language'  },
    { name: 'Python',     icon: 'assets/icons/Python.png',       track: 'AI & Data' },
    { name: 'Angular',    icon: 'assets/icons/Angular.png',      track: 'Frontend'  },
    { name: 'PostgreSQL', icon: 'assets/icons/PostgresSQL.png',  track: 'Database'  },
    { name: 'Docker',     icon: 'assets/icons/Docker.png',       track: 'DevOps'    },
    { name: 'Swagger',    icon: 'assets/icons/Swagger.png',      track: 'API Docs'  },
  ];

  journeyMetrics = [
    { value: '30+', label: 'Projects Shipped' },
    { value: '2024', label: 'Started Professional Journey' },
    { value: 'AI + Web', label: 'Specialization' },
  ];
}
